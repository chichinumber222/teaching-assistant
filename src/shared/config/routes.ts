export const APP_ROUTES = {
  students: "/students",
  studentsId: "/students/[studentId]",
  studentsNew: "/students/new",
  login: "/login",
  register: "/register",
  profile: "/profile",
  admin: "/admin",
} as const;

export const GUEST_ROUTES = [APP_ROUTES.login, APP_ROUTES.register] as const;

export const TEACHER_ROLE_ROUTES = [
  APP_ROUTES.profile,
  APP_ROUTES.students,
  APP_ROUTES.studentsId,
  APP_ROUTES.studentsNew,
] as const;

export const ADMIN_ROLE_ROUTES = [APP_ROUTES.admin] as const;
