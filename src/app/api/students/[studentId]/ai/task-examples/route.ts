import { NextRequest, NextResponse } from "next/server";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import { buildAuthServices } from "@/modules/auth/composition/build-auth-services";
import { SessionResolutionResultKind } from "@/modules/auth/application/resolve-session/constants";
import { unauthorizedResponseWithCookieDeletion } from "@/app/api/_lib/auth/unauthorized-response";
import { buildAiServices } from "@/modules/ai/composition/build-ai-services";
import { GenerateTaskExamplesResultKind } from "@/modules/ai/application/generate-task-examples/constants";
import { verifySameOrigin } from "@/app/api/_lib/http/verify-same-origin";
import { MemoryRateLimiter } from "@/app/api/_lib/shared/rate-limiter";
import { parseJson } from "@/app/api/_lib/shared/parse-json";
import { generateTaskExamplesRequestSchema } from "@/modules/ai/infrastructure/server/ai-schemes";

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
      key: `ai:practice-from-next-lesson-plan:${authResult.user.id}`,
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
        {
          message: "Invalid request body",
          reason: {
            code: "ai.invalid_parsed_json",
          },
        },
        { status: 400 },
      );
    }

    const parsedBody = generateTaskExamplesRequestSchema.safeParse(json.data);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Invalid request body",
          reason: {
            code: "ai.invalid_validation",
          },
        },
        { status: 400 },
      );
    }

    const { studentId } = await params;

    const { generateTaskExamples } = buildAiServices();
    const result = await generateTaskExamples.execute({
      teacherUserId: authResult.user.id,
      studentId,
      mode: parsedBody.data.mode,
    });

    if (result.kind === GenerateTaskExamplesResultKind.TEACHER_NOT_FOUND) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 },
      );
    }

    if (result.kind === GenerateTaskExamplesResultKind.USER_IS_NOT_TEACHER) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (result.kind === GenerateTaskExamplesResultKind.STUDENT_NOT_FOUND) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 },
      );
    }

    if (
      result.kind === GenerateTaskExamplesResultKind.NEXT_LESSON_PLAN_NOT_FOUND
    ) {
      return NextResponse.json(
        { message: "Next lesson plan not found" },
        { status: 404 },
      );
    }

    if (
      result.kind === GenerateTaskExamplesResultKind.NEXT_LESSON_PLAN_OUTDATED
    ) {
      return NextResponse.json(
        {
          message:
            "Next lesson plan is outdated. Generate a new next lesson plan first.",
        },
        { status: 409 },
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
