export type Session = {
  id: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
  lastSeenAt: string;
  revokedAt: string | null;
  ipAddress: string | null;
  userAgent: string | null;
};
