import { PasswordReasonErrorCode } from "@/modules/auth/infrastructure/server/map-password-policy-error-code-to-password-reason-code";

export function mapPasswordReasonErrorCodeToMessage(
  reasonCode: PasswordReasonErrorCode,
): string {
  switch (reasonCode) {
    case PasswordReasonErrorCode.EMPTY:
      return "Пароль обязателен";
    case PasswordReasonErrorCode.TOO_SHORT:
      return "Пароль слишком короткий";
    case PasswordReasonErrorCode.TOO_LONG:
      return "Пароль слишком длинный";
    case PasswordReasonErrorCode.MISSING_LETTER:
      return "Пароль должен содержать хотя бы одну букву";
    case PasswordReasonErrorCode.MISSING_DIGIT:
      return "Пароль должен содержать хотя бы одну цифру";
    case PasswordReasonErrorCode.MISSING_SPECIAL_CHARACTER:
      return "Пароль должен содержать хотя бы один спецсимвол";
    default:
      return "Неизвестная причина ошибки пароля";
  }
}
