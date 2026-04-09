import "server-only";

import { buildStudentsServices } from "@/modules/students/composition/build-students-services";
import { GetStudentDossierResultKind } from "@/modules/students/application/get-student-dossier/constants";
import type { StudentDossier } from "@/modules/students/application/get-student-dossier/types";

const LIMIT_LESSON_REPORTS = 50;

type GetStudentDossierViewDataInput = {
  teacherId: string;
  studentId: string;
};

type GetStudentDossierViewDataResult =
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

export function getStudentDossierViewData({
  teacherId,
  studentId,
}: GetStudentDossierViewDataInput): GetStudentDossierViewDataResult {
  try {
    const { getStudentDossier } = buildStudentsServices();

    const result = getStudentDossier.execute({
      teacherUserId: teacherId,
      studentId,
      lessonReportsLimit: LIMIT_LESSON_REPORTS,
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
