import "server-only";

import { buildStudentsServices } from "@/modules/students/composition/build-students-services";
import { GetStudentDossierResultKind } from "@/modules/students/application/get-student-dossier/constants";
import type { StudentDossier } from "@/modules/students/application/get-student-dossier/types";

type GetStudentPageDataInput = {
  teacherId: string;
  studentId: string;
};

type GetStudentPageDataResult =
  | {
      ok: true;
      data: StudentDossier;
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
    const { getStudentDossier } = buildStudentsServices();

    const result = getStudentDossier.execute({
      teacherUserId: teacherId,
      studentId,
      lessonReportsLimit: 100,
    });

    if (result.kind === GetStudentDossierResultKind.FOUND) {
      return {
        ok: true,
        data: result.dossier,
      };
    }

    if (
      result.kind === GetStudentDossierResultKind.TEACHER_NOT_FOUND ||
      result.kind === GetStudentDossierResultKind.USER_IS_NOT_TEACHER ||
      result.kind === GetStudentDossierResultKind.STUDENT_NOT_FOUND
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
