import { NextRequest, NextResponse } from "next/server";
import { SessionResolutionResultKind } from "@/modules/auth/application/resolve-session/constants";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import { createAuthServices } from "@/modules/auth/infrastructure/server/auth-service-factory";
import { mapUserToPublicUserDto } from "@/modules/auth/infrastructure/server/map-user-to-public-user-dto";
import { unauthorizedResponseWithCookieDeletion } from "@/app/api/_lib/auth/unauthorized-response"

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { resolveSession } = createAuthServices();
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
