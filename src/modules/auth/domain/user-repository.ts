import type { User, UserRole } from "./user";

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
