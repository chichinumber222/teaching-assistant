import { Session } from "@/modules/auth/domain/session"
import { User } from "@/modules/auth/domain/user"
import { SessionResolutionFailureReason, SessionResolutionResultKind } from "./constants"

export type SessionResolutionInput = {
  sessionId: string;
};

export type SessionResolutionResult =
  | {
      kind: SessionResolutionResultKind.AUTHENTICATED;
      user: User;
      session: Session;
    }
  | {
      kind: SessionResolutionResultKind.UNAUTHENTICATED;
      reason: SessionResolutionFailureReason;
    };
