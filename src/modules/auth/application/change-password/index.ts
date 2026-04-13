import type { PasswordHasher } from "@/modules/auth/domain/password-hasher";
import type { UserRepository } from "@/modules/auth/domain/user-repository";
import type { ChangePasswordInput, ChangePasswordResult } from "./types";
import { ChangePasswordResultKind } from "./constants";
import { validatePasswordPolicy } from "@/modules/auth/domain/password-policy";

export class ChangePassword {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  execute(input: ChangePasswordInput): ChangePasswordResult {
    const user = this.userRepository.findById(input.userId);

    if (!user) {
      return {
        kind: ChangePasswordResultKind.USER_NOT_FOUND,
      };
    }

    if (!user.isActive) {
      return {
        kind: ChangePasswordResultKind.USER_INACTIVE,
      };
    }

    const isCurrentPasswordValid = this.passwordHasher.compare(
      input.currentPassword,
      user.passwordHash,
    );

    if (!isCurrentPasswordValid) {
      return {
        kind: ChangePasswordResultKind.INVALID_CURRENT_PASSWORD,
      };
    }

    const preparedNewPassword = validatePasswordPolicy(input.newPassword);

    if (!preparedNewPassword.ok) {
      return {
        kind: ChangePasswordResultKind.INVALID_NEW_PASSWORD,
        reason: preparedNewPassword.error,
      };
    }

    const nextPasswordHash = this.passwordHasher.hash(input.newPassword);

    const isUpdated = this.userRepository.updatePassword(
      user.id,
      nextPasswordHash,
    );

    if (!isUpdated) {
      return {
        kind: ChangePasswordResultKind.USER_NOT_FOUND,
      };
    }

    return {
      kind: ChangePasswordResultKind.PASSWORD_CHANGED,
    };
  }
}
