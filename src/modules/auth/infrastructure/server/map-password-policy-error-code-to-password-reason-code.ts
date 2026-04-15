import { PasswordPolicyErrorCode } from "@/modules/auth/domain/password-policy";

export enum PasswordReasonErrorCode {
  EMPTY = "empty",
  TOO_SHORT = "too_short",
  TOO_LONG = "too_long",
  MISSING_LETTER = "missing_letter",
  MISSING_DIGIT = "missing_digit",
  MISSING_SPECIAL_CHARACTER = "missing_special_character",
}

export function mapPasswordPolicyErrorCodeToPasswordReasonErrorCode(
  code: PasswordPolicyErrorCode,
): PasswordReasonErrorCode {
  switch (code) {
    case PasswordPolicyErrorCode.EMPTY:
      return PasswordReasonErrorCode.EMPTY;

    case PasswordPolicyErrorCode.TOO_SHORT:
      return PasswordReasonErrorCode.TOO_SHORT;

    case PasswordPolicyErrorCode.TOO_LONG:
      return PasswordReasonErrorCode.TOO_LONG;

    case PasswordPolicyErrorCode.MISSING_LETTER:
      return PasswordReasonErrorCode.MISSING_LETTER;

    case PasswordPolicyErrorCode.MISSING_DIGIT:
      return PasswordReasonErrorCode.MISSING_DIGIT;

    case PasswordPolicyErrorCode.MISSING_SPECIAL_CHARACTER:
      return PasswordReasonErrorCode.MISSING_SPECIAL_CHARACTER;
  }
}
