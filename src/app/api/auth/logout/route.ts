import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_SESSION_COOKIE_NAME,
  AUTH_SESSION_COOKIE_OPTIONS,
} from "@/modules/auth/shared/auth-cookie";
import { buildAuthServices } from "@/modules/auth/composition/build-auth-services";
import { verifySameOrigin } from "@/app/api/_lib/http/verify-same-origin";

export async function POST(request: NextRequest) {
  try {
    const originCheck = verifySameOrigin(request);

    if (!originCheck.ok) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const sessionId = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;

    if (sessionId) {
      const { logoutUser } = buildAuthServices();
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
