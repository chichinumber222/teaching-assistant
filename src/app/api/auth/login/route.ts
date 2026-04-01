import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_SESSION_COOKIE_NAME,
  AUTH_SESSION_COOKIE_OPTIONS,
} from "@/modules/auth/shared/auth-cookie";
import { buildAuthServices } from "@/modules/auth/composition/build-auth-services";
import { mapUserToPublicUserDto } from "@/modules/auth/infrastructure/server/map-user-to-public-user-dto";
import { loginRequestSchema } from "@/modules/auth/infrastructure/server/auth-schemes";
import { LoginUserResultKind } from "@/modules/auth/application/login-user/constants";
import { verifySameOrigin } from "@/app/api/_lib/http/verify-same-origin";
import { parseJson } from "@/app/api/_lib/shared/parse-json";

export async function POST(request: NextRequest) {
  try {
    const originCheck = verifySameOrigin(request);

    if (!originCheck.ok) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const json = await parseJson(request);

    if (!json.ok) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const parsedBody = loginRequestSchema.safeParse(json.data);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const { loginUser } = buildAuthServices();

    const result = loginUser.execute({
      email: parsedBody.data.email,
      password: parsedBody.data.password,
      ipAddress:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        null,
      userAgent: request.headers.get("user-agent") || null,
    });

    if (result.kind === LoginUserResultKind.INVALID_CREDENTIALS) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    if (result.kind === LoginUserResultKind.INACTIVE_USER) {
      return NextResponse.json(
        { message: "User account is inactive" },
        { status: 403 },
      );
    }

    const response = NextResponse.json(
      {
        user: mapUserToPublicUserDto(result.user),
      },
      { status: 200 },
    );

    response.cookies.set(
      AUTH_SESSION_COOKIE_NAME,
      result.session.id,
      AUTH_SESSION_COOKIE_OPTIONS,
    );

    return response;
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
