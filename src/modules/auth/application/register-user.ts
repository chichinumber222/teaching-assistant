import type { PasswordHasher } from "@/modules/auth/domain/password-hasher";
import type { UserRepository } from "@/modules/auth/domain/user-repository";
import type { User } from "@/modules/auth/domain/user";
import type { UserRole } from "@/modules/auth/domain/user-role";

export enum RegisterUserResultKind {
  REGISTERED = "registered",
  EMAIL_ALREADY_IN_USE = "email_already_in_use",
}

export type RegisterUserResult =
  | {
      kind: RegisterUserResultKind.REGISTERED;
      user: User;
    }
  | {
      kind: RegisterUserResultKind.EMAIL_ALREADY_IN_USE;
    };

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

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
