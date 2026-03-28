import type { PasswordHasher } from "@/modules/auth/domain/password-hasher";
import type { UserRepository } from "@/modules/auth/domain/user-repository";
import type { RegisterUserInput, RegisterUserResult } from "./types";
import { RegisterUserResultKind } from "./constants";

export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  execute(input: RegisterUserInput): RegisterUserResult {
    const existingUser = this.userRepository.findByEmail(input.email);
    if (existingUser) {
      return {
        kind: RegisterUserResultKind.EMAIL_ALREADY_IN_USE,
      };
    }

    const passwordHash = this.passwordHasher.hash(input.password);
    const user = this.userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role,
    });

    return {
      kind: RegisterUserResultKind.REGISTERED,
      user,
    };
  }
}
