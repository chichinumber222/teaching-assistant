import type { User } from "@/modules/auth/domain/user";
import { UpdateUserResultKind } from "./constants";

export type UpdateUserInput = {
  userId: string;
  name: string;
  email: string;
};

export type UpdateUserResult =
  | {
      kind: UpdateUserResultKind.UPDATED;
      user: User;
    }
  | {
      kind: UpdateUserResultKind.USER_NOT_FOUND;
    }
  | {
      kind: UpdateUserResultKind.USER_INACTIVE;
    }
  | {
      kind: UpdateUserResultKind.INVALID_NAME;
    }
  | {
      kind: UpdateUserResultKind.INVALID_EMAIL;
    }
  | {
      kind: UpdateUserResultKind.EMAIL_ALREADY_IN_USE;
    };
