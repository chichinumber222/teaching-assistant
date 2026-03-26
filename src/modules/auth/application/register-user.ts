import type { PasswordHasher } from "@/modules/auth/domain/password-hasher";
import type { UserRepository } from "@/modules/auth/domain/user-repository";
import type { User } from "@/modules/auth/domain/user";
import type { UserRole } from "@/modules/auth/domain/user-role";

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export class EmailAlreadyInUseError extends Error {
  constructor(email: string) {
    super(`User with email "${email}" already exists`);
    this.name = "EmailAlreadyInUseError";
  }
}

export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  execute(input: RegisterUserInput): User {
    const existingUser = this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new EmailAlreadyInUseError(input.email);
    }
    const passwordHash = this.passwordHasher.hash(input.password);

    return this.userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role,
    });
  }
}
