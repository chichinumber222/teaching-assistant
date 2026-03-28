import type { SessionRepository } from "@/modules/auth/domain/session-repository";

export type LogoutUserInput = {
  sessionId: string;
};

export enum LogoutUserResultKind {
  LOGGED_OUT = "logged_out",
}

export type LogoutUserResult = {
  kind: LogoutUserResultKind.LOGGED_OUT;
};

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
