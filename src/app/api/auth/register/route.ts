import { NextRequest, NextResponse } from "next/server";
import { RegisterUserResultKind } from "@/modules/auth/application/register-user/constants";
import { buildAuthServices } from "@/modules/auth/composition/build-auth-services";
import { mapUserToPublicUserDto } from "@/modules/auth/infrastructure/server/map-user-to-public-user-dto";
import { registerRequestSchema } from "@/modules/auth/infrastructure/server/auth-schemes";
import { UserRole } from "@/modules/auth/domain/user-role";
import { verifySameOrigin } from "@/app/api/_lib/http/verify-same-origin";
import { parseJson } from "@/app/api/_lib/shared/parse-json";

export async function POST(request: NextRequest) {
  try {
    const originCheck = verifySameOrigin(request);

    if (!originCheck.ok) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const json = await parseJson(request);
    if (!json.ok) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const parsedBody = registerRequestSchema.safeParse(json.data);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const { registerUser } = buildAuthServices();
    const result = registerUser.execute({
      name: parsedBody.data.name,
      email: parsedBody.data.email,
      password: parsedBody.data.password,
      role: UserRole.Teacher,
    });

    if (result.kind === RegisterUserResultKind.INVALID_NAME) {
      return NextResponse.json({ message: "Invalid name" }, { status: 400 });
    }

    if (result.kind === RegisterUserResultKind.INVALID_EMAIL) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    if (result.kind === RegisterUserResultKind.EMAIL_ALREADY_IN_USE) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 },
      );
    }

    if (result.kind === RegisterUserResultKind.INVALID_PASSWORD) {
      return NextResponse.json(
        {
          message: 'invalid_password',
          reason: result.reason,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { user: mapUserToPublicUserDto(result.user) },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
