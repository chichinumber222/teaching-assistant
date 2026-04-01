type RateLimitRecord = {
  count: number;
  windowStartedAt: number;
  windowMs: number;
};

export type CheckRateLimitInput = {
  key: string;
  limit: number;
  windowMs: number;
};

export type CheckRateLimitResult =
  | { ok: true }
  | {
      ok: false;
      retryAfterSeconds: number;
    };

export class MemoryRateLimiter {
  private readonly storage = new Map<string, RateLimitRecord>();
  private requestsSinceLastCleanup = 0;

  check(input: CheckRateLimitInput): CheckRateLimitResult {
    const now = Date.now();
    const record = this.storage.get(input.key);

    this.requestsSinceLastCleanup += 1;

    if (this.requestsSinceLastCleanup >= 100) {
      this.cleanupExpiredEntries(now);
      this.requestsSinceLastCleanup = 0;
    }

    if (!record) {
      this.storage.set(input.key, {
        count: 1,
        windowStartedAt: now,
        windowMs: input.windowMs,
      });

      return { ok: true };
    }

    const elapsedMs = now - record.windowStartedAt;

    if (elapsedMs >= record.windowMs) {
      this.storage.set(input.key, {
        count: 1,
        windowStartedAt: now,
        windowMs: input.windowMs,
      });

      return { ok: true };
    }

    if (record.count >= input.limit) {
      return {
        ok: false,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((record.windowMs - elapsedMs) / 1000),
        ),
      };
    }

    record.count += 1;
    return { ok: true };
  }

  private cleanupExpiredEntries(now: number): void {
    for (const [key, record] of this.storage.entries()) {
      if (now - record.windowStartedAt >= record.windowMs) {
        this.storage.delete(key);
      }
    }
  }
}
