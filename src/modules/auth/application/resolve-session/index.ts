import type { SessionRepository } from "@/modules/auth/domain/session-repository";
import type { UserRepository } from "@/modules/auth/domain/user-repository";
import type { SessionResolutionInput, SessionResolutionResult } from "./types"
import { SessionResolutionFailureReason, SessionResolutionResultKind } from "./constants"

export class InspectSession {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  execute(input: SessionResolutionInput): SessionResolutionResult {
    const session = this.sessionRepository.findById(input.sessionId);

    if (!session) {
      return {
        kind: SessionResolutionResultKind.UNAUTHENTICATED,
        reason: SessionResolutionFailureReason.SESSION_NOT_FOUND,
      };
    }

    if (session.revokedAt !== null) {
      return {
        kind: SessionResolutionResultKind.UNAUTHENTICATED,
        reason: SessionResolutionFailureReason.SESSION_REVOKED,
      };
    }

    const isExpired = new Date(session.expiresAt).getTime() <= Date.now();
    if (isExpired) {
      return {
        kind: SessionResolutionResultKind.UNAUTHENTICATED,
        reason: SessionResolutionFailureReason.SESSION_EXPIRED,
      };
    }

    const user = this.userRepository.findById(session.userId);

    if (!user) {
      return {
        kind: SessionResolutionResultKind.UNAUTHENTICATED,
        reason: SessionResolutionFailureReason.USER_NOT_FOUND,
      };
    }

    if (!user.isActive) {
      return {
        kind: SessionResolutionResultKind.UNAUTHENTICATED,
        reason: SessionResolutionFailureReason.USER_INACTIVE,
      };
    }

    return {
      kind: SessionResolutionResultKind.AUTHENTICATED,
      user,
      session,
    };
  }
}

export class ResolveSession {
  constructor(
    private readonly inspectSession: InspectSession,
    private readonly sessionRepository: SessionRepository,
  ) {}

  execute(input: SessionResolutionInput): SessionResolutionResult {
    const result = this.inspectSession.execute(input);

    if (
      result.kind === SessionResolutionResultKind.UNAUTHENTICATED &&
      (result.reason === SessionResolutionFailureReason.USER_NOT_FOUND ||
        result.reason === SessionResolutionFailureReason.USER_INACTIVE)
    ) {
      this.sessionRepository.revoke(input.sessionId, new Date().toISOString());
    }

    return result;
  }
}
