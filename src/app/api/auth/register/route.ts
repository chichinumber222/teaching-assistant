import { NextRequest, NextResponse } from "next/server";
import { EmailAlreadyInUseError } from "@/modules/auth/application/register-user";
import { createAuthServices } from "@/modules/auth/infrastructure/server/auth-service-factory";
import { mapUserToPublicUserDto } from "@/modules/auth/infrastructure/http/map-user-to-public-user-dto";
import { registerRequestSchema } from "@/modules/auth/infrastructure/http/auth-schemes";
import { UserRole } from "@/modules/auth/domain/user-role"

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const parsedBody = registerRequestSchema.safeParse(json);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const { registerUser } = createAuthServices();

    const user = registerUser.execute({
      name: parsedBody.data.name,
      email: parsedBody.data.email,
      password: parsedBody.data.password,
      role: UserRole.Teacher,
    });

    return NextResponse.json({
      user: mapUserToPublicUserDto(user),
    });
  } catch (error) {
    if (error instanceof EmailAlreadyInUseError) {
      return NextResponse.json({ message: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}