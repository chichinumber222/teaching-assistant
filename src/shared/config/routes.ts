export const APP_ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  profile: "/profile",
  admin: "/admin",
} as const;

export const GUEST_ROUTES = [APP_ROUTES.login, APP_ROUTES.register] as const;

export const TEACHER_ROLE_ROUTES = [
  APP_ROUTES.home,
  APP_ROUTES.profile,
] as const;

export const ADMIN_ROLE_ROUTES = [
  APP_ROUTES.admin,
  APP_ROUTES.home,
  APP_ROUTES.profile,
] as const;
