import { NextRequest, NextResponse } from "next/server";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import { buildAuthServices } from "@/modules/auth/composition/build-auth-services";
import { SessionResolutionResultKind } from "@/modules/auth/application/resolve-session/constants";
import { unauthorizedResponseWithCookieDeletion } from "@/app/api/_lib/auth/unauthorized-response";
import { buildAiServices } from "@/modules/ai/composition/build-ai-services";
import { GeneratePracticeResultKind } from "@/modules/ai/application/generate-practice/constants";
import { verifySameOrigin } from "@/app/api/_lib/http/verify-same-origin";
import { MemoryRateLimiter } from "@/app/api/_lib/shared/rate-limiter";
import { parseJson } from "@/app/api/_lib/shared/parse-json";
import { generatePracticeRequestSchema } from "@/modules/ai/infrastructure/server/ai-schemes";

const rateLimiter = new MemoryRateLimiter();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ studentId: string }> },
) {
  try {
    const originCheck = verifySameOrigin(request);

    if (!originCheck.ok) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const sessionId = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { resolveSession } = buildAuthServices();
    const authResult = resolveSession.execute({ sessionId });

    if (authResult.kind === SessionResolutionResultKind.UNAUTHENTICATED) {
      return unauthorizedResponseWithCookieDeletion();
    }

    const rateLimitResult = rateLimiter.check({
      key: `ai:practice:${authResult.user.id}`,
      limit: 5,
      windowMs: 60 * 1000,
    });

    if (!rateLimitResult.ok) {
      return NextResponse.json(
        {
          message: `Rate limit exceeded. Try again in ${rateLimitResult.retryAfterSeconds} seconds.`,
        },
        { status: 429 },
      );
    }

    const json = await parseJson(request);

    if (!json.ok) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const parsedBody = generatePracticeRequestSchema.safeParse(json.data);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const { studentId } = await params;

    const { generatePractice } = buildAiServices();
    const result = await generatePractice.execute({
      teacherUserId: authResult.user.id,
      studentId,
      mode: parsedBody.data.mode,
    });

    if (result.kind === GeneratePracticeResultKind.TEACHER_NOT_FOUND) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 },
      );
    }

    if (result.kind === GeneratePracticeResultKind.USER_IS_NOT_TEACHER) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (result.kind === GeneratePracticeResultKind.STUDENT_NOT_FOUND) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ text: result.text }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
