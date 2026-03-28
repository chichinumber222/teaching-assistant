import type { PasswordHasher } from "@/modules/auth/domain/password-hasher";
import type { UserRepository } from "@/modules/auth/domain/user-repository";
import type { AuthenticateUserInput, AuthenticateUserResult } from "./types";
import { AuthenticateUserResultKind } from "./constants";
import dummyPasswordHash from "@/modules/auth/shared/dummy-password-hash";
import { prepareEmail } from "@/modules/auth/shared/prepare-email";

export class AuthenticateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  execute(input: AuthenticateUserInput): AuthenticateUserResult {
    const preparedEmail = prepareEmail(input.email);
    const user = this.userRepository.findByEmail(preparedEmail);

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
