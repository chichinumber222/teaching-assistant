import { NextRequest, NextResponse } from "next/server";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import { buildAuthServices } from "@/modules/auth/composition/build-auth-services";
import { SessionResolutionResultKind } from "@/modules/auth/application/resolve-session/constants";
import { unauthorizedResponseWithCookieDeletion } from "@/app/api/_lib/auth/unauthorized-response";
import { parseJson } from "@/app/api/_lib/shared/parse-json";
import { buildStudentsServices } from "@/modules/students/composition/build-students-services";
import { createStudentLessonReportRequestSchema } from "@/modules/students/infrastructure/server/students-schemes";
import { CreateStudentLessonReportResultKind } from "@/modules/students/application/create-student-lesson-report/constants";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ studentId: string }> },
) {
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

    const parsedBody = createStudentLessonReportRequestSchema.safeParse(
      json.data,
    );

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const { studentId } = await params;

    const { createStudentLessonReport } = buildStudentsServices();
    const result = createStudentLessonReport.execute({
      teacherUserId: authResult.user.id,
      studentId,
      lessonAt: parsedBody.data.lessonAt,
      lessonPlan: parsedBody.data.lessonPlan,
      uncompletedPlannedWork: parsedBody.data.uncompletedPlannedWork,
      understandingLevel: parsedBody.data.understandingLevel,
      whatWentWell: parsedBody.data.whatWentWell,
      difficulties: parsedBody.data.difficulties,
      homeworkStatus: parsedBody.data.homeworkStatus,
      homeworkComment: parsedBody.data.homeworkComment,
      teacherComment: parsedBody.data.teacherComment,
    });

    if (result.kind === CreateStudentLessonReportResultKind.TEACHER_NOT_FOUND) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 },
      );
    }

    if (
      result.kind === CreateStudentLessonReportResultKind.USER_IS_NOT_TEACHER
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (result.kind === CreateStudentLessonReportResultKind.STUDENT_NOT_FOUND) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { lessonReport: result.lessonReport },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
