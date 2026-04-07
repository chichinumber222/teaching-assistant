import "server-only";

import { buildStudentsServices } from "@/modules/students/composition/build-students-services";
import { GetStudentResultKind } from "@/modules/students/application/get-student/constants";
import type { Student } from "@/modules/students/domain/student";

type GetCreateReportPageDataInput = {
  teacherId: string;
  studentId: string;
};

type GetCreateReportPageDataResult =
  | {
      ok: true;
      student: Student;
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

export function getCreateReportPageData({
  teacherId,
  studentId,
}: GetCreateReportPageDataInput): GetCreateReportPageDataResult {
  try {
    const { getStudent } = buildStudentsServices();

    const result = getStudent.execute({
      teacherUserId: teacherId,
      studentId,
    });

    if (result.kind === GetStudentResultKind.FOUND) {
      return {
        ok: true,
        student: result.student,
      };
    }

    if (
      result.kind === GetStudentResultKind.TEACHER_NOT_FOUND ||
      result.kind === GetStudentResultKind.USER_IS_NOT_TEACHER ||
      result.kind === GetStudentResultKind.STUDENT_NOT_FOUND
    ) {
      return {
        ok: false,
        reason: "not_found",
      };
    }

    return {
      ok: false,
      reason: "error",
      message: "Не удалось загрузить страницу создания карточки занятия.",
    };
  } catch {
    return {
      ok: false,
      reason: "error",
      message: "Не удалось загрузить страницу создания карточки занятия.",
    };
  }
}