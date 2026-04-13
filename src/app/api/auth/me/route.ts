import { NextRequest, NextResponse } from "next/server";
import { SessionResolutionResultKind } from "@/modules/auth/application/resolve-session/constants";
import { UpdateUserResultKind } from "@/modules/auth/application/update-user/constants";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import { buildAuthServices } from "@/modules/auth/composition/build-auth-services";
import { mapUserToPublicUserDto } from "@/modules/auth/infrastructure/server/map-user-to-public-user-dto";
import { updateRequestSchema } from "@/modules/auth/infrastructure/server/auth-schemes";
import { unauthorizedResponseWithCookieDeletion } from "@/app/api/_lib/auth/unauthorized-response";
import { verifySameOrigin } from "@/app/api/_lib/http/verify-same-origin";
import { parseJson } from "@/app/api/_lib/shared/parse-json";

export async function GET(request: NextRequest) {
  try {
    const originCheck = verifySameOrigin(request);

    if (!originCheck.ok) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const sessionId = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { resolveSession } = buildAuthServices();
    const result = resolveSession.execute({ sessionId });

    if (result.kind === SessionResolutionResultKind.UNAUTHENTICATED) {
      return unauthorizedResponseWithCookieDeletion();
    }

    return NextResponse.json({
      user: mapUserToPublicUserDto(result.user),
    });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const originCheck = verifySameOrigin(request);

    if (!originCheck.ok) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const sessionId = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { resolveSession, updateUser } = buildAuthServices();
    const authResult = resolveSession.execute({ sessionId });

    if (authResult.kind === SessionResolutionResultKind.UNAUTHENTICATED) {
      return unauthorizedResponseWithCookieDeletion();
    }

    const json = await parseJson(request);
    if (!json.ok) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const parsedBody = updateRequestSchema.safeParse(json.data);
    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const result = updateUser.execute({
      userId: authResult.user.id,
      name: parsedBody.data.name,
      email: parsedBody.data.email,
    });

    if (result.kind === UpdateUserResultKind.USER_NOT_FOUND) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (result.kind === UpdateUserResultKind.USER_INACTIVE) {
      return NextResponse.json(
        { message: "User is inactive" },
        { status: 403 },
      );
    }

    if (result.kind === UpdateUserResultKind.INVALID_NAME) {
      return NextResponse.json({ message: "Invalid name" }, { status: 400 });
    }

    if (result.kind === UpdateUserResultKind.INVALID_EMAIL) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    if (result.kind === UpdateUserResultKind.EMAIL_ALREADY_IN_USE) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 },
      );
    }

    return NextResponse.json({
      user: mapUserToPublicUserDto(result.user),
    });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
