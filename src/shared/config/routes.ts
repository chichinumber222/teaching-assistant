export const APP_ROUTE_PATTERNS = {
  login: "/login",
  register: "/register",
  profile: "/profile",
  admin: "/admin",

  students: "/students",
  studentsNew: "/students/new",
  student: "/students/[studentId]",
  studentLessonReport: "/students/[studentId]/lesson-reports/[lessonReportId]",
} as const;

export const APP_ROUTES = {
  login: APP_ROUTE_PATTERNS.login,
  register: APP_ROUTE_PATTERNS.register,
  profile: APP_ROUTE_PATTERNS.profile,
  admin: APP_ROUTE_PATTERNS.admin,

  students: APP_ROUTE_PATTERNS.students,
  studentsNew: APP_ROUTE_PATTERNS.studentsNew,

  student(studentId: string): string {
    return `/students/${encodeURIComponent(studentId)}`;
  },

  studentLessonReport(studentId: string, lessonReportId: string): string {
    return `/students/${encodeURIComponent(
      studentId,
    )}/lesson-reports/${encodeURIComponent(lessonReportId)}`;
  },
} as const;

export const GUEST_ROUTES = [
  APP_ROUTE_PATTERNS.login,
  APP_ROUTE_PATTERNS.register,
] as const;

export const TEACHER_ROLE_ROUTES = [
  APP_ROUTE_PATTERNS.profile,
  APP_ROUTE_PATTERNS.students,
  APP_ROUTE_PATTERNS.student,
  APP_ROUTE_PATTERNS.studentsNew,
  APP_ROUTE_PATTERNS.studentLessonReport,
] as const;

export const ADMIN_ROLE_ROUTES = [APP_ROUTE_PATTERNS.admin] as const;
