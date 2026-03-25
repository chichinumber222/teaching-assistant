export const AUTH_SESSION_COOKIE_NAME = "session_id";

export const AUTH_SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};
