import type { PasswordHasher } from "@/modules/auth/domain/password-hasher";
import type { UserRepository } from "@/modules/auth/domain/user-repository";
import type { RegisterUserInput, RegisterUserResult } from "./types";
import { RegisterUserResultKind } from "./constants";
import { prepareEmail } from "@/modules/auth/shared/prepare-email";

export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  execute(input: RegisterUserInput): RegisterUserResult {
    const preparedEmail = prepareEmail(input.email);
    const existingUser = this.userRepository.findByEmail(preparedEmail);
    if (existingUser) {
      return {
        kind: RegisterUserResultKind.EMAIL_ALREADY_IN_USE,
      };
    }

    const passwordHash = this.passwordHasher.hash(input.password);
    const user = this.userRepository.create({
      name: input.name,
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
