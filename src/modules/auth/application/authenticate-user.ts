import type { PasswordHasher } from "../domain/password-hasher";
import type { UserRepository } from "../domain/user-repository";
import type { User } from "../domain/user";

export type AuthenticateUserInput = {
  email: string;
  password: string;
};

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
  }
}

export class InactiveUserError extends Error {
  constructor() {
    super("User is inactive");
    this.name = "InactiveUserError";
  }
}

export class AuthenticateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  execute(input: AuthenticateUserInput): User {
    const user = this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    if (!user.isActive) {
      throw new InactiveUserError();
    }

    const isPasswordValid = this.passwordHasher.compare(
      input.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
