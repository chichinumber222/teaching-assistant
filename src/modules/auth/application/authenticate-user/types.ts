import { User } from "@/modules/auth/domain/user";
import { AuthenticateUserResultKind } from "./constants";

export type AuthenticateUserInput = {
  email: string;
  password: string;
};

export type AuthenticateUserResult =
  | {
      kind: AuthenticateUserResultKind.AUTHENTICATED;
      user: User;
    }
  | {
      kind: AuthenticateUserResultKind.INVALID_CREDENTIALS;
    }
  | {
      kind: AuthenticateUserResultKind.INACTIVE_USER;
    };
