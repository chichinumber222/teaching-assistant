import { NextRequest, NextResponse } from "next/server";
import { RegisterUserResultKind } from "@/modules/auth/application/register-user/constants";
import { createAuthServices } from "@/modules/auth/infrastructure/server/auth-service-factory";
import { mapUserToPublicUserDto } from "@/modules/auth/infrastructure/http/map-user-to-public-user-dto";
import { registerRequestSchema } from "@/modules/auth/infrastructure/http/auth-schemes";
import { UserRole } from "@/modules/auth/domain/user-role";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsedBody = registerRequestSchema.safeParse(json);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const { registerUser } = createAuthServices();

    const result = registerUser.execute({
      name: parsedBody.data.name,
      email: parsedBody.data.email,
      password: parsedBody.data.password,
      role: UserRole.Teacher,
    });

    if (result.kind === RegisterUserResultKind.EMAIL_ALREADY_IN_USE) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 },
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
