import { NextRequest, NextResponse } from "next/server";
import {
  InactiveUserError,
  InvalidCredentialsError,
} from "@/modules/auth/application/authenticate-user";
import {
  AUTH_SESSION_COOKIE_NAME,
  AUTH_SESSION_COOKIE_OPTIONS,
} from "@/modules/auth/infrastructure/server/auth-cookie";
import { createAuthServices } from "@/modules/auth/infrastructure/server/auth-service-factory";
import { mapUserToPublicUserDto } from "@/modules/auth/infrastructure/http/map-user-to-public-user-dto";
import { loginRequestSchema } from "@/modules/auth/infrastructure/http/auth-schemes";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const parsedBody = loginRequestSchema.safeParse(json);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const { loginUser } = createAuthServices();

    const result = loginUser.execute({
      email: parsedBody.data.email,
      password: parsedBody.data.password,
      ipAddress:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        null,
      userAgent: request.headers.get("user-agent") || null,
    });

    const response = NextResponse.json({
      user: mapUserToPublicUserDto(result.user),
    });

    response.cookies.set(
      AUTH_SESSION_COOKIE_NAME,
      result.session.id,
      AUTH_SESSION_COOKIE_OPTIONS,
    );

    return response;
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    if (error instanceof InactiveUserError) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
