import { NextRequest, NextResponse } from "next/server";
import { LogoutUser } from "@/modules/auth/application/logout-user";
import { SqliteSessionRepository } from "@/modules/auth/infrastructure/sqlite-session-repository";
import {
  AUTH_SESSION_COOKIE_NAME,
  AUTH_SESSION_COOKIE_OPTIONS,
} from "@/modules/auth/infrastructure/auth-cookie";

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;

  if (sessionId) {
    const sessionRepository = new SqliteSessionRepository();
    const logoutUser = new LogoutUser(sessionRepository);

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
}
