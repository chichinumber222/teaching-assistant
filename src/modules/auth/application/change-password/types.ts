import { PasswordPolicyError } from "@/modules/auth/domain/password-policy";
import { ChangePasswordResultKind } from "./constants";

export type ChangePasswordInput = {
  userId: string;
  currentPassword: string;
  newPassword: string;
};

export type ChangePasswordResult =
  | {
      kind: ChangePasswordResultKind.PASSWORD_CHANGED;
    }
  | {
      kind: ChangePasswordResultKind.USER_NOT_FOUND;
    }
  | {
      kind: ChangePasswordResultKind.USER_INACTIVE;
    }
  | {
      kind: ChangePasswordResultKind.INVALID_CURRENT_PASSWORD;
    }
  | {
      kind: ChangePasswordResultKind.INVALID_NEW_PASSWORD;
      reason: PasswordPolicyError;
    };
