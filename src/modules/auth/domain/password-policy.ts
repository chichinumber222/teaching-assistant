export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 128;

export const DEFAULT_PASSWORD_POLICY = {
  minLength: MIN_PASSWORD_LENGTH,
  maxLength: MAX_PASSWORD_LENGTH,
  requireLetter: true,
  requireDigit: true,
  requireSpecialCharacter: false,
} as const;

export type PasswordPolicy = {
  minLength: number;
  maxLength: number;
  requireLetter: boolean;
  requireDigit: boolean;
  requireSpecialCharacter: boolean;
};

export enum PasswordPolicyErrorCode {
  EMPTY = "empty",
  TOO_SHORT = "too_short",
  TOO_LONG = "too_long",
  MISSING_LETTER = "missing_letter",
  MISSING_DIGIT = "missing_digit",
  MISSING_SPECIAL_CHARACTER = "missing_special_character",
}

export type PasswordPolicyError = {
  code: PasswordPolicyErrorCode;
};

export type PasswordPolicyResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: PasswordPolicyError;
    };

export function validatePasswordPolicy(
  password: string,
  policy: PasswordPolicy = DEFAULT_PASSWORD_POLICY,
): PasswordPolicyResult {
  if (password.length === 0) {
    return {
      ok: false,
      error: { code: PasswordPolicyErrorCode.EMPTY },
    };
  }

  if (password.length < policy.minLength) {
    return {
      ok: false,
      error: { code: PasswordPolicyErrorCode.TOO_SHORT },
    };
  }

  if (password.length > policy.maxLength) {
    return {
      ok: false,
      error: { code: PasswordPolicyErrorCode.TOO_LONG },
    };
  }

  if (policy.requireLetter && !/[a-zA-Z]/.test(password)) {
    return {
      ok: false,
      error: { code: PasswordPolicyErrorCode.MISSING_LETTER },
    };
  }

  if (policy.requireDigit && !/\d/.test(password)) {
    return {
      ok: false,
      error: { code: PasswordPolicyErrorCode.MISSING_DIGIT },
    };
  }

  if (
    policy.requireSpecialCharacter &&
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    return {
      ok: false,
      error: { code: PasswordPolicyErrorCode.MISSING_SPECIAL_CHARACTER },
    };
  }

  return { ok: true };
}
