import { NextRequest, NextResponse } from "next/server";
import {
  GetCurrentUser,
  InvalidSessionError,
} from "@/modules/auth/application/get-current-user";
import { SqliteSessionRepository } from "@/modules/auth/infrastructure/sqlite-session-repository";
import { SqliteUserRepository } from "@/modules/auth/infrastructure/sqlite-user-repository";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/infrastructure/auth-cookie";

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionRepository = new SqliteSessionRepository();
    const userRepository = new SqliteUserRepository();

    const getCurrentUser = new GetCurrentUser(
      sessionRepository,
      userRepository,
    );

    const result = getCurrentUser.execute({ sessionId });

    return NextResponse.json({
      user: {
        id: result.user.id,
        email: result.user.email,
        role: result.user.role,
        isActive: result.user.isActive,
        createdAt: result.user.createdAt,
        updatedAt: result.user.updatedAt,
      },
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
