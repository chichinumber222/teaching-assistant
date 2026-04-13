import type { UserRepository } from "@/modules/auth/domain/user-repository";
import { prepareEmail } from "@/modules/auth/shared/prepare-email";
import type { UpdateUserInput, UpdateUserResult } from "./types";
import { UpdateUserResultKind } from "./constants";
import { prepareName } from "@/modules/auth/shared/prepare-name";

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  execute(input: UpdateUserInput): UpdateUserResult {
    const user = this.userRepository.findById(input.userId);

    if (!user) {
      return {
        kind: UpdateUserResultKind.USER_NOT_FOUND,
      };
    }

    if (!user.isActive) {
      return {
        kind: UpdateUserResultKind.USER_INACTIVE,
      };
    }

    const preparedName = prepareName(input.name);

    if (!preparedName) {
      return {
        kind: UpdateUserResultKind.INVALID_NAME,
      };
    }

    const preparedEmail = prepareEmail(input.email);

    if (!preparedEmail) {
      return {
        kind: UpdateUserResultKind.INVALID_EMAIL,
      };
    }

    const existingUser = this.userRepository.findByEmail(preparedEmail);

    if (existingUser && existingUser.id !== user.id) {
      return {
        kind: UpdateUserResultKind.EMAIL_ALREADY_IN_USE,
      };
    }

    const isUpdated = this.userRepository.update(user.id, {
      name: preparedName,
      email: preparedEmail,
    });

    if (!isUpdated) {
      return {
        kind: UpdateUserResultKind.USER_NOT_FOUND,
      };
    }

    const updatedUser = this.userRepository.findById(user.id);

    if (!updatedUser) {
      return {
        kind: UpdateUserResultKind.USER_NOT_FOUND,
      };
    }

    return {
      kind: UpdateUserResultKind.UPDATED,
      user: updatedUser,
    };
  }
}
