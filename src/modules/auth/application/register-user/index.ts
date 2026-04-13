import type { PasswordHasher } from "@/modules/auth/domain/password-hasher";
import type { UserRepository } from "@/modules/auth/domain/user-repository";
import type { RegisterUserInput, RegisterUserResult } from "./types";
import { RegisterUserResultKind } from "./constants";
import { prepareEmail } from "@/modules/auth/shared/prepare-email";
import { prepareName } from "@/modules/auth/shared/prepare-name";
import { validatePasswordPolicy } from "@/modules/auth/domain/password-policy";

export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  execute(input: RegisterUserInput): RegisterUserResult {
    const preparedEmail = prepareEmail(input.email);

    if (!preparedEmail) {
      return {
        kind: RegisterUserResultKind.INVALID_EMAIL,
      };
    }

    const preparedName = prepareName(input.name);

    if (!preparedName) {
      return {
        kind: RegisterUserResultKind.INVALID_NAME,
      };
    }

    const existingUser = this.userRepository.findByEmail(preparedEmail);

    if (existingUser) {
      return {
        kind: RegisterUserResultKind.EMAIL_ALREADY_IN_USE,
      };
    }

    const preparedPassword = validatePasswordPolicy(input.password);

    if (!preparedPassword.ok) {
      return {
        kind: RegisterUserResultKind.INVALID_PASSWORD,
        reason: preparedPassword.error,
      };
    }

    const passwordHash = this.passwordHasher.hash(input.password);

    const user = this.userRepository.create({
      name: preparedName,
      email: preparedEmail,
      passwordHash,
      role: input.role,
    });

    return {
      kind: RegisterUserResultKind.REGISTERED,
      user,
    };
  }
}
