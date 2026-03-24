import { randomUUID } from "node:crypto";
import { db } from "@/server/db/client";
import type { Session } from "../domain/session";
import type {
  SessionRepository,
  CreateSessionData,
} from "../domain/session-repository";

type SessionRow = {
  id: string;
  user_id: string;
  expires_at: string;
  created_at: string;
  last_seen_at: string;
  revoked_at: string | null;
  ip_address: string | null;
  user_agent: string | null;
};

function mapSessionRowToSession(row: SessionRow): Session {
  return {
    id: row.id,
    userId: row.user_id,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
    lastSeenAt: row.last_seen_at,
    revokedAt: row.revoked_at,
    ipAddress: row.ip_address,
    userAgent: row.user_agent,
  };
}

export class SqliteSessionRepository implements SessionRepository {
  findById(id: string): Session | null {
    const statement = db.prepare<[string], SessionRow>(
      `SELECT id, user_id, expires_at, created_at, last_seen_at, revoked_at, ip_address, user_agent 
      FROM sessions 
      WHERE id = ?
      `,
    );
    const row = statement.get(id);

    if (!row) {
      return null;
    }

    return mapSessionRowToSession(row);
  }

  create(data: CreateSessionData): Session {
    const id = randomUUID();
    const now = new Date().toISOString();

    const statement = db.prepare(
      `
        INSERT INTO sessions (
          id, 
          user_id, 
          expires_at, 
          created_at, 
          last_seen_at, 
          revoked_at, 
          ip_address, 
          user_agent
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
    );

    statement.run(
      id,
      data.userId,
      data.expiresAt,
      now,
      now,
      null,
      data.ipAddress,
      data.userAgent,
    );

    return {
      id,
      userId: data.userId,
      expiresAt: data.expiresAt,
      createdAt: now,
      lastSeenAt: now,
      revokedAt: null,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
    }
  }

  updateLastSeenAt(id: string, lastSeenAt: string): void {
    const statement = db.prepare<[string, string]>(
      `
        UPDATE sessions 
        SET last_seen_at = ? 
        WHERE id = ?
      `,
    );

    statement.run(lastSeenAt, id);
  }

  revoke(id: string, revokedAt: string): void {
    const statement = db.prepare<[string, string]>(
      `
        UPDATE sessions 
        SET revoked_at = ? 
        WHERE id = ?
      `,
    );

    statement.run(revokedAt, id);
  }
}
