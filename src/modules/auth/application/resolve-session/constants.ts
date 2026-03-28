export enum SessionResolutionFailureReason {
  SESSION_NOT_FOUND = "session_not_found",
  SESSION_REVOKED = "session_revoked",
  SESSION_EXPIRED = "session_expired",
  USER_NOT_FOUND = "user_not_found",
  USER_INACTIVE = "user_inactive",
}

export enum SessionResolutionResultKind {
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
}
