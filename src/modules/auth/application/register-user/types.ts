import { UserRole } from "@/modules/auth/domain/user-role";
import { User } from "@/modules/auth/domain/user";
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
      kind: RegisterUserResultKind.EMAIL_ALREADY_IN_USE;
    };
