export type ParseJsonResult = { ok: true; data: unknown } | { ok: false };

export async function parseJson(request: Request): Promise<ParseJsonResult> {
  try {
    const data = await request.json();
    return { ok: true, data };
  } catch {
    return { ok: false };
  }
}
