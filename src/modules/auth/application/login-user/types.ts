import { Session } from "@/modules/auth/domain/session";
import { User } from "@/modules/auth/domain/user";
import { LoginUserResultKind } from "./constants"

export type LoginUserInput = {
  email: string;
  password: string;
  ipAddress: string | null;
  userAgent: string | null;
};

export type LoginUserResult =
  | {
      kind: LoginUserResultKind.LOGGED_IN;
      user: User;
      session: Session;
    }
  | {
      kind: LoginUserResultKind.INVALID_CREDENTIALS;
    }
  | {
      kind: LoginUserResultKind.INACTIVE_USER;
    };
