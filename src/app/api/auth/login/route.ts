import { NextRequest, NextResponse } from "next/server";
import {
  AuthenticateUser,
  InactiveUserError,
  InvalidCredentialsError,
} from "@/modules/auth/application/authenticate-user";
import { LoginUser } from "@/modules/auth/application/login-user";
import { ScryptPasswordHasher } from "@/modules/auth/infrastructure/scrypt-password-hasher";
import { SqliteSessionRepository } from "@/modules/auth/infrastructure/sqlite-session-repository";
import { SqliteUserRepository } from "@/modules/auth/infrastructure/sqlite-user-repository";
import {
  AUTH_SESSION_COOKIE_NAME,
  AUTH_SESSION_COOKIE_OPTIONS,
} from "@/modules/auth/infrastructure/auth-cookie";

type LoginRequestBody = {
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginRequestBody;

    const userRepository = new SqliteUserRepository();
    const passwordHasher = new ScryptPasswordHasher();
    const sessionRepository = new SqliteSessionRepository();

    const authenticateUser = new AuthenticateUser(
      userRepository,
      passwordHasher,
    );

    const loginUser = new LoginUser(authenticateUser, sessionRepository);

    const result = loginUser.execute({
      email: body.email,
      password: body.password,
      ipAddress:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        null,
      userAgent: request.headers.get("user-agent") || null,
    });

    const response = NextResponse.json({
      user: {
        id: result.user.id,
        email: result.user.email,
        role: result.user.role,
        isActive: result.user.isActive,
        createdAt: result.user.createdAt,
        updatedAt: result.user.updatedAt,
      },
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
