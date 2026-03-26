import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_SESSION_COOKIE_NAME,
  AUTH_SESSION_COOKIE_OPTIONS,
} from "@/modules/auth/infrastructure/server/auth-cookie";
import { createAuthServices } from "@/modules/auth/infrastructure/server/auth-service-factory"

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;

    if (sessionId) {
      const { logoutUser } = createAuthServices();
      logoutUser.execute({ sessionId });
    }

    const response = NextResponse.json({
      message: "Logged out successfully",
    });

    response.cookies.set(AUTH_SESSION_COOKIE_NAME, "", {
      ...AUTH_SESSION_COOKIE_OPTIONS,
      maxAge: 0,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}