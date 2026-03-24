import { SessionRepository } from "../domain/session-repository";
import { UserRepository } from "../domain/user-repository";
import { Session } from "../domain/session";
import { User } from "../domain/user";

export type GetCurrentUserInput = {
  sessionId: string;
};

export type GetCurrentUserResult = {
  user: User;
  session: Session;
};

export class InvalidSessionError extends Error {
  constructor() {
    super("Invalid session");
    this.name = "InvalidSessionError";
  }
}

export class GetCurrentUser {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  execute(input: GetCurrentUserInput): GetCurrentUserResult {
    const session = this.sessionRepository.findById(input.sessionId);
    
    if (!session) {
      throw new InvalidSessionError();
    }

    if (session.revokedAt !== null) {
      throw new InvalidSessionError();
    }

    const isExpired = new Date(session.expiresAt).getTime() < Date.now();
    if (isExpired) {
      throw new InvalidSessionError();
    }

    const user = this.userRepository.findById(session.userId);

    if (!user) {
      throw new InvalidSessionError();
    }

    if (!user.isActive) {
      throw new InvalidSessionError();
    }

    return { user, session };
  }
}
