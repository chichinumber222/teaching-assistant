import {
  PasswordPolicyErrorCode,
  type PasswordPolicyError,
} from "@/modules/auth/domain/password-policy";

export function mapPasswordPolicyError(error: PasswordPolicyError): string {
  switch (error.code) {
    case PasswordPolicyErrorCode.EMPTY:
      return "Пароль обязателен";

    case PasswordPolicyErrorCode.TOO_SHORT:
      return "Пароль слишком короткий";

    case PasswordPolicyErrorCode.TOO_LONG:
      return "Пароль слишком длинный";

    case PasswordPolicyErrorCode.MISSING_LETTER:
      return "Пароль должен содержать хотя бы одну букву";

    case PasswordPolicyErrorCode.MISSING_DIGIT:
      return "Пароль должен содержать хотя бы одну цифру";

    case PasswordPolicyErrorCode.MISSING_SPECIAL_CHARACTER:
      return "Пароль должен содержать хотя бы один спецсимвол";
  }
}
