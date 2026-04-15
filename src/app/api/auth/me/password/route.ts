import { NextRequest, NextResponse } from "next/server";
import { SessionResolutionResultKind } from "@/modules/auth/application/resolve-session/constants";
import { ChangePasswordResultKind } from "@/modules/auth/application/change-password/constants";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import { buildAuthServices } from "@/modules/auth/composition/build-auth-services";
import { updatePasswordRequestSchema } from "@/modules/auth/infrastructure/server/auth-schemes";
import { mapPasswordPolicyErrorCodeToPasswordReasonErrorCode } from "@/modules/auth/infrastructure/server/map-password-policy-error-code-to-password-reason-code";
import { unauthorizedResponseWithCookieDeletion } from "@/app/api/_lib/auth/unauthorized-response";
import { verifySameOrigin } from "@/app/api/_lib/http/verify-same-origin";
import { parseJson } from "@/app/api/_lib/shared/parse-json";

export async function PATCH(request: NextRequest) {
  try {
    const originCheck = verifySameOrigin(request);

    if (!originCheck.ok) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const sessionId = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { resolveSession, changePassword } = buildAuthServices();
    const authResult = resolveSession.execute({ sessionId });

    if (authResult.kind === SessionResolutionResultKind.UNAUTHENTICATED) {
      return unauthorizedResponseWithCookieDeletion();
    }

    const json = await parseJson(request);
    if (!json.ok) {
      return NextResponse.json(
        {
          message: "Invalid request body",
          reason: {
            code: "auth.invalid_parsed_json",
          },
        },
        { status: 400 },
      );
    }

    const parsedBody = updatePasswordRequestSchema.safeParse(json.data);
    
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Invalid request body",
          reason: {
            code: "auth.invalid_validation",
          },
        },
        { status: 400 },
      );
    }

    const result = changePassword.execute({
      userId: authResult.user.id,
      currentPassword: parsedBody.data.currentPassword,
      newPassword: parsedBody.data.newPassword,
    });

    if (result.kind === ChangePasswordResultKind.USER_NOT_FOUND) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (result.kind === ChangePasswordResultKind.USER_INACTIVE) {
      return NextResponse.json(
        { message: "User is inactive" },
        { status: 403 },
      );
    }
    if (result.kind === ChangePasswordResultKind.INVALID_CURRENT_PASSWORD) {
      return NextResponse.json(
        {
          message: "Invalid request body",
          reason: {
            code: "auth.invalid_current_password",
          },
        },
        { status: 400 },
      );
    }

    if (result.kind === ChangePasswordResultKind.INVALID_NEW_PASSWORD) {
      return NextResponse.json(
        {
          message: "Invalid request body",
          reason: {
            code: "auth.invalid_password",
            details: mapPasswordPolicyErrorCodeToPasswordReasonErrorCode(
              result.reason.code,
            ),
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json({}, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
