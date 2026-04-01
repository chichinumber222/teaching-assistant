import { NextRequest } from "next/server";

export enum VerifySameOriginErrorReason {
  MISSING_ORIGIN = "MISSING_ORIGIN",
  ORIGIN_MISMATCH = "ORIGIN_MISMATCH",
}

export type VerifySameOriginResult =
  | { ok: true }
  | {
      ok: false;
      reason: VerifySameOriginErrorReason;
    };

export function verifySameOrigin(
  request: NextRequest,
): VerifySameOriginResult {
  const origin = request.headers.get("origin");

  if (!origin) {
    return {
      ok: false,
      reason: VerifySameOriginErrorReason.MISSING_ORIGIN,
    };
  }

  if (origin !== request.nextUrl.origin) {
    return {
      ok: false,
      reason: VerifySameOriginErrorReason.ORIGIN_MISMATCH,
    };
  }

  return { ok: true };
}