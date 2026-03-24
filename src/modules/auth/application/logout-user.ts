import { SessionRepository } from "../domain/session-repository";

export type LogoutUserInput = {
  sessionId: string;
};

export class LogoutUser {
  constructor(
    private readonly sessionRepository: SessionRepository,
  ) {}

  execute(input: LogoutUserInput): void {
    const session = this.sessionRepository.findById(input.sessionId);

    if (!session) {
      return;
    }

    if (session.revokedAt !== null) {
      return;
    }

    const now = new Date().toISOString();

    this.sessionRepository.revoke(input.sessionId, now);
  }
}