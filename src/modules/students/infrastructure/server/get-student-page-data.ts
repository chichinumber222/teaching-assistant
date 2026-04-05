import "server-only";

import { buildStudentsServices } from "@/modules/students/composition/build-students-services";
import { GetStudentContextResultKind } from "@/modules/students/application/get-student-context/constants";
import type { StudentContext } from "@/modules/students/application/get-student-context/types";

type GetStudentPageDataInput = {
  teacherId: string;
  studentId: string;
};

type GetStudentPageDataResult =
  | {
      ok: true;
      context: StudentContext;
    }
  | {
      ok: false;
      reason: "not_found";
    }
  | {
      ok: false;
      reason: "error";
      message: string;
    };

export function getStudentPageData({
  teacherId,
  studentId,
}: GetStudentPageDataInput): GetStudentPageDataResult {
  try {
    const { getStudentContext } = buildStudentsServices();

    const result = getStudentContext.execute({
      teacherUserId: teacherId,
      studentId,
      lessonReportsLimit: 100,
    });

    if (result.kind === GetStudentContextResultKind.FOUND) {
      return {
        ok: true,
        context: result.context,
      };
    }

    if (
      result.kind === GetStudentContextResultKind.TEACHER_NOT_FOUND ||
      result.kind === GetStudentContextResultKind.USER_IS_NOT_TEACHER ||
      result.kind === GetStudentContextResultKind.STUDENT_NOT_FOUND
    ) {
      return {
        ok: false,
        reason: "not_found",
      };
    }

    return {
      ok: false,
      reason: "error",
      message: "Не удалось загрузить страницу ученика.",
    };
  } catch {
    return {
      ok: false,
      reason: "error",
      message: "Не удалось загрузить страницу ученика.",
    };
  }
}
