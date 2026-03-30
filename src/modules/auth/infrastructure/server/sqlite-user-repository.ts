import { randomUUID } from "node:crypto";
import { db } from "@/server/db/client";

import type {
  CreateUserData,
  UserRepository,
} from "@/modules/auth/domain/user-repository";
import type { User } from "@/modules/auth/domain/user";
import type { UserRole } from "@/modules/auth/domain/user-role";

type UserRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

function mapRowToUser(row: UserRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class SqliteUserRepository implements UserRepository {
  findByEmail(email: string): User | null {
    const statement = db.prepare<[string], UserRow>(
      `SELECT id, name, email, password_hash, role, is_active, created_at, updated_at
       FROM users
       WHERE email = ?`,
    );
    const row = statement.get(email);

    if (!row) {
      return null;
    }
    return mapRowToUser(row);
  }

  findById(id: string): User | null {
    const statement = db.prepare<[string], UserRow>(
      `SELECT id, name, email, password_hash, role, is_active, created_at, updated_at
       FROM users
       WHERE id = ?`,
    );
    const row = statement.get(id);

    if (!row) {
      return null;
    }

    return mapRowToUser(row);
  }

  create(data: CreateUserData): User {
    const id = randomUUID();
    const now = new Date().toISOString();
    const statement = db.prepare(
      `INSERT INTO users (id, name, email, password_hash, role, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    );
    statement.run(
      id,
      data.name,
      data.email,
      data.passwordHash,
      data.role,
      1,
      now,
      now,
    );

    return {
      id,
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
  }
}
