export enum ChangePasswordResultKind {
  PASSWORD_CHANGED = "password_changed",
  USER_NOT_FOUND = "user_not_found",
  USER_INACTIVE = "user_inactive",
  INVALID_CURRENT_PASSWORD = "invalid_current_password",
  INVALID_NEW_PASSWORD = "invalid_new_password",
}
