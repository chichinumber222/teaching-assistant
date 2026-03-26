import { NextRequest, NextResponse } from "next/server";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import {
  APP_ROUTES,
  GUEST_ROUTES,
  PROTECTED_ROUTES,
} from "@/shared/config/routes";

function routeMatcher(pathname: string, route: string) {
  if (route === "/") {
    return pathname === route;
  }
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSessionCookie = Boolean(
    request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value,
  );

  const isGuestRoute = GUEST_ROUTES.some((route) =>
    routeMatcher(pathname, route),
  );

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    routeMatcher(pathname, route),
  );

  if (!hasSessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL(APP_ROUTES.login, request.url));
  }

  if (hasSessionCookie && isGuestRoute) {
    return NextResponse.redirect(new URL(APP_ROUTES.home, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/profile/:path*"],
};
