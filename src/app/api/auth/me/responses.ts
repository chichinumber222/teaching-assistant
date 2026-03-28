import {
  AUTH_SESSION_COOKIE_NAME,
  AUTH_SESSION_COOKIE_OPTIONS,
} from "@/modules/auth/shared/auth-cookie";
import { NextResponse } from "next/server";

export const unauthorizedResponseWithCookieDeletion = () => {
  const response = NextResponse.json(
    { message: "Unauthorized" },
    { status: 401 },
  );

  response.cookies.set(AUTH_SESSION_COOKIE_NAME, "", {
    ...AUTH_SESSION_COOKIE_OPTIONS,
    maxAge: 0,
  });

  return response;
};
