import type { Student } from "@/modules/students/domain/student";
import type { LessonReport } from "@/modules/students/domain/lesson-report";
import { LessonReportsList } from "./lesson-reports-list";
import { StudentProfile } from "./student-profile";

type StudentPageViewProps = {
  student: Student;
  lessonReports: LessonReport[];
  reportsAction?: React.ReactNode;
  studentPageAction?: React.ReactNode;
};

export function StudentView({
  student,
  lessonReports,
  reportsAction,
  studentPageAction,
}: StudentPageViewProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      {studentPageAction ? (
        <div className="flex flex-col gap-4 md:flex-row">
          <StudentProfile student={student} className="flex-1" />
          <div className="md:w-54 flex md:items-stretch">
            {studentPageAction}
          </div>
        </div>
      ) : (
        <StudentProfile student={student} />
      )}
      <LessonReportsList
        lessonReports={lessonReports}
        headerAction={reportsAction}
      />
    </div>
  );
}
