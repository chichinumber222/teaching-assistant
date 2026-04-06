import type { Student } from "@/modules/students/domain/student";
import type { LessonReport } from "@/modules/students/domain/lesson-report";
import { LessonReportsList } from "./lesson-reports-list";
import { StudentProfile } from "./student-profile";
import { CreateReportLink } from "../create-lesson-report/create-report-link";
import { APP_ROUTES } from "@/shared/config/routes";

type StudentPageViewProps = {
  student: Student;
  lessonReports: LessonReport[];
};

export function StudentView({ student, lessonReports }: StudentPageViewProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <StudentProfile student={student} />
      <LessonReportsList
        lessonReports={lessonReports}
        headerAction={
          <CreateReportLink
            href={APP_ROUTES.studentLessonReportsNew(student.id)}
          />
        }
      />
    </div>
  );
}
