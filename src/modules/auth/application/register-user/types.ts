import { UserRole } from "@/modules/auth/domain/user-role";
import { User } from "@/modules/auth/domain/user";
import { PasswordPolicyError } from "@/modules/auth/domain/password-policy";
import { RegisterUserResultKind } from "./constants";

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type RegisterUserResult =
  | {
      kind: RegisterUserResultKind.REGISTERED;
      user: User;
    }
  | {
      kind: RegisterUserResultKind.INVALID_NAME;
    }
  | {
      kind: RegisterUserResultKind.INVALID_EMAIL;
    }
  | {
      kind: RegisterUserResultKind.EMAIL_ALREADY_IN_USE;
    }
  | {
      kind: RegisterUserResultKind.INVALID_PASSWORD;
      reason: PasswordPolicyError;
    };
