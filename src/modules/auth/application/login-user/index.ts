import type { AuthenticateUser } from "../authenticate-user";
import { AuthenticateUserResultKind } from "../authenticate-user/constants";
import type { SessionRepository } from "@/modules/auth/domain/session-repository";
import type { LoginUserInput, LoginUserResult } from "./types";
import { LoginUserResultKind } from './constants'
import SESSION_TTL_MS from "@/modules/auth/shared/session-ttl-ms";

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
