import type { User } from "./user";
import type { UserRole } from "./user-role";

export type CreateUserData = {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
};

export type UpdateUserData = {
  name: string;
  email: string;
};

export interface UserRepository {
  findByEmail(email: string): User | null;
  findById(id: string): User | null;
  create(data: CreateUserData): User;
  update(userId: string, data: UpdateUserData): boolean;
  updatePassword(userId: string, passwordHash: string): boolean;
}
