import type { Session } from "./session";

export type CreateSessionData = {
  userId: string;
  expiresAt: string;
  ipAddress: string | null;
  userAgent: string | null;
};

export interface SessionRepository {
  findById(id: string): Session | null;
  create(data: CreateSessionData): Session;
  updateLastSeenAt(id: string, lastSeenAt: string): void;
  revoke(id: string, revokedAt: string): void;
}