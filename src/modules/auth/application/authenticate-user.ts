import type { PasswordHasher } from "@/modules/auth/domain/password-hasher";
import type { UserRepository } from "@/modules/auth/domain/user-repository";
import type { User } from "@/modules/auth/domain/user";
import dummyPasswordHash from "@/modules/auth/shared/dummy-password-hash";

export type AuthenticateUserInput = {
  email: string;
  password: string;
};

export enum AuthenticateUserResultKind {
  AUTHENTICATED = "authenticated",
  INVALID_CREDENTIALS = "invalid_credentials",
  INACTIVE_USER = "inactive_user",
}

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

export class AuthenticateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  execute(input: AuthenticateUserInput): AuthenticateUserResult {
    const user = this.userRepository.findByEmail(input.email);

    if (!user) {
      this.passwordHasher.compare(input.password, dummyPasswordHash); // Mitigate timing attacks
      return {
        kind: AuthenticateUserResultKind.INVALID_CREDENTIALS,
      };
    }

    const isPasswordValid = this.passwordHasher.compare(
      input.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      return {
        kind: AuthenticateUserResultKind.INVALID_CREDENTIALS,
      };
    }

    if (!user.isActive) {
      return {
        kind: AuthenticateUserResultKind.INACTIVE_USER,
      };
    }

    return {
      kind: AuthenticateUserResultKind.AUTHENTICATED,
      user,
    };
  }
}
