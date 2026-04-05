import type { Student } from "@/modules/students/domain/student";
import type { LessonReport } from "@/modules/students/domain/lesson-report";
import { LessonReportsList } from "./lesson-reports-list";
import { StudentProfile } from "./student-profile";

type StudentPageViewProps = {
  student: Student;
  lessonReports: LessonReport[];
};

export function StudentView({ student, lessonReports }: StudentPageViewProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <StudentProfile student={student} />
      <LessonReportsList lessonReports={lessonReports} />
    </div>
  );
}
