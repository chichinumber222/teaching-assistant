import { NextRequest, NextResponse } from "next/server";
import { buildAiServices } from "@/modules/ai/composition/build-ai-services"; 
import { LanguageModelMessageRole } from "@/modules/ai/domain/language-model";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import { buildAuthServices } from "@/modules/auth/composition/build-auth-services";
import { SessionResolutionResultKind } from "@/modules/auth/application/resolve-session/constants";
import { unauthorizedResponseWithCookieDeletion } from "@/app/api/_lib/auth/unauthorized-response";

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { resolveSession } = buildAuthServices();
    const authResult = resolveSession.execute({ sessionId });

    if (authResult.kind === SessionResolutionResultKind.UNAUTHENTICATED) {
      return unauthorizedResponseWithCookieDeletion();
    }

    const { generateText } = buildAiServices();

    const result = await generateText.execute({
      messages: [
        {
          role: LanguageModelMessageRole.User,
          text: "Привет, составь план на урок, по изучению дробей. Подробно",
        },
      ],
      temperature: 0.3,
      maxTokens: 500,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("AI generate route failed:", error);

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Failed to generate text" },
      { status: 500 },
    );
  }
}
