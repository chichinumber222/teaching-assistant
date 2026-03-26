import { NextRequest, NextResponse } from "next/server";
import { InvalidSessionError } from "@/modules/auth/application/get-current-user";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import { createAuthServices } from "@/modules/auth/infrastructure/server/auth-service-factory";
import { mapUserToPublicUserDto } from "@/modules/auth/infrastructure/http/map-user-to-public-user-dto";

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { getCurrentUser } = createAuthServices();
    const result = getCurrentUser.execute({ sessionId });

    return NextResponse.json({
      user: mapUserToPublicUserDto(result.user),
    });
  } catch (error) {
    if (error instanceof InvalidSessionError) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
