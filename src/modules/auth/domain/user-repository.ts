import type { User } from "./user";
import type { UserRole } from "./user-role";

export type CreateUserData = {
  email: string;
  passwordHash: string;
  role: UserRole;
};

export interface UserRepository {
  findByEmail(email: string): User | null;
  findById(id: string): User | null;
  create(data: CreateUserData): User;
}
