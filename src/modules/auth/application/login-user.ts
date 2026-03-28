import {
  AuthenticateUser,
  AuthenticateUserResultKind,
} from "./authenticate-user";
import type { SessionRepository } from "@/modules/auth/domain/session-repository";
import type { Session } from "@/modules/auth/domain/session";
import type { User } from "@/modules/auth/domain/user";
import SESSION_TTL_MS from "@/modules/auth/shared/session-ttl-ms";

export type LoginUserInput = {
  email: string;
  password: string;
  ipAddress: string | null;
  userAgent: string | null;
};

export enum LoginUserResultKind {
  LOGGED_IN = "logged_in",
  INVALID_CREDENTIALS = "invalid_credentials",
  INACTIVE_USER = "inactive_user",
}

export type LoginUserResult =
  | {
      kind: LoginUserResultKind.LOGGED_IN;
      user: User;
      session: Session;
    }
  | {
      kind: LoginUserResultKind.INVALID_CREDENTIALS;
    }
  | {
      kind: LoginUserResultKind.INACTIVE_USER;
    };

export class LoginUser {
  constructor(
    private readonly authenticateUser: AuthenticateUser,
    private readonly sessionRepository: SessionRepository,
  ) {}

  execute(input: LoginUserInput): LoginUserResult {
    const authResult = this.authenticateUser.execute({
      email: input.email,
      password: input.password,
    });

    if (authResult.kind === AuthenticateUserResultKind.INVALID_CREDENTIALS) {
      return {
        kind: LoginUserResultKind.INVALID_CREDENTIALS,
      };
    }

    if (authResult.kind === AuthenticateUserResultKind.INACTIVE_USER) {
      return {
        kind: LoginUserResultKind.INACTIVE_USER,
      };
    }

    const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

    const session = this.sessionRepository.create({
      userId: authResult.user.id,
      expiresAt,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    });

    return {
      kind: LoginUserResultKind.LOGGED_IN,
      user: authResult.user,
      session,
    };
  }
}
