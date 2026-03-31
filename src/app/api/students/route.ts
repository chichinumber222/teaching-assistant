import { NextRequest, NextResponse } from "next/server";
import { CreateStudentResultKind } from "@/modules/students/application/create-student/constants";
import { buildStudentsServices } from "@/modules/students/composition/build-students-services";
import { createStudentRequestSchema } from "@/modules/students/infrastructure/server/students-schemes";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import { buildAuthServices } from "@/modules/auth/composition/build-auth-services";
import { SessionResolutionResultKind } from "@/modules/auth/application/resolve-session/constants";
import { unauthorizedResponseWithCookieDeletion } from "@/app/api/_lib/auth/unauthorized-response";
import { parseJson } from "@/app/api/_lib/shared/parse-json";

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

    const json = await parseJson(request);
    if (!json.ok) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const parsedBody = createStudentRequestSchema.safeParse(json.data);
    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const { createStudent } = buildStudentsServices();
    const result = createStudent.execute({
      teacherUserId: authResult.user.id,
      fullName: parsedBody.data.fullName,
      subject: parsedBody.data.subject,
      level: parsedBody.data.level,
      goals: parsedBody.data.goals,
      notes: parsedBody.data.notes,
    });

    if (result.kind === CreateStudentResultKind.TEACHER_NOT_FOUND) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 },
      );
    }

    if (result.kind === CreateStudentResultKind.USER_IS_NOT_TEACHER) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ student: result.student }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
