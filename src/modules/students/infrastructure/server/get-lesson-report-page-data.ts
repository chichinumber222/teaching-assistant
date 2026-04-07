import "server-only";

import { buildStudentsServices } from "@/modules/students/composition/build-students-services";
import { GetLessonReportResultKind } from "@/modules/students/application/get-lesson-report/constants";
import type { LessonReport } from "@/modules/students/domain/lesson-report";

type GetLessonReportPageDataInput = {
  teacherId: string;
  studentId: string;
  lessonReportId: string;
};

type GetLessonReportPageDataResult =
  | {
      ok: true;
      lessonReport: LessonReport;
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

export function getLessonReportPageData({
  teacherId,
  studentId,
  lessonReportId,
}: GetLessonReportPageDataInput): GetLessonReportPageDataResult {
  try {
    const { getLessonReport } = buildStudentsServices();

    const result = getLessonReport.execute({
      teacherUserId: teacherId,
      studentId,
      lessonReportId,
    });

    if (result.kind === GetLessonReportResultKind.FOUND) {
      return {
        ok: true,
        lessonReport: result.lessonReport,
      };
    }

    if (
      result.kind === GetLessonReportResultKind.TEACHER_NOT_FOUND ||
      result.kind === GetLessonReportResultKind.USER_IS_NOT_TEACHER ||
      result.kind === GetLessonReportResultKind.STUDENT_NOT_FOUND ||
      result.kind === GetLessonReportResultKind.LESSON_REPORT_NOT_FOUND
    ) {
      return {
        ok: false,
        reason: "not_found",
      };
    }

    return {
      ok: false,
      reason: "error",
      message: "Не удалось загрузить отчёт по уроку.",
    };
  } catch {
    return {
      ok: false,
      reason: "error",
      message: "Произошла непредвиденная ошибка при загрузке отчёта по уроку.",
    };
  }
}
