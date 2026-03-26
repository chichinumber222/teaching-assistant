export const APP_ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  profile: "/profile",
} as const;

export const GUEST_ROUTES = [APP_ROUTES.login, APP_ROUTES.register] as const;

export const PROTECTED_ROUTES = [APP_ROUTES.home, APP_ROUTES.profile] as const;
