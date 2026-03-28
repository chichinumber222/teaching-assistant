import type { SessionRepository } from "@/modules/auth/domain/session-repository";
import type { LogoutUserInput, LogoutUserResult } from "./types";
import { LogoutUserResultKind } from "./constants";

export class LogoutUser {
  constructor(private readonly sessionRepository: SessionRepository) {}

  execute(input: LogoutUserInput): LogoutUserResult {
    const session = this.sessionRepository.findById(input.sessionId);

    if (
      session &&
      session.revokedAt === null &&
      !this.isExpired(session.expiresAt)
    ) {
      this.sessionRepository.revoke(input.sessionId, new Date().toISOString());
    }

    return {
      kind: LogoutUserResultKind.LOGGED_OUT,
    };
  }

  private isExpired(expiresAt: string): boolean {
    return new Date(expiresAt).getTime() <= Date.now();
  }
}
