import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import { createAuthServices } from "./auth-service-factory";
import { APP_ROUTES } from "@/shared/config/routes";
import { SessionResolutionResultKind } from "@/modules/auth/application/resolve-session/constants";

// on Protected pages
export async function protectedAuthGuard() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    redirect(APP_ROUTES.login);
  }

  const { inspectSession } = createAuthServices();
  const result = inspectSession.execute({ sessionId });

  if (result.kind === SessionResolutionResultKind.UNAUTHENTICATED) {
    redirect(APP_ROUTES.login);
  }
}

// on Guest pages
export async function guestAuthGuard() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    return;
  }

  const { inspectSession } = createAuthServices();
  const result = inspectSession.execute({ sessionId });

  if (result.kind === SessionResolutionResultKind.AUTHENTICATED) {
    redirect(APP_ROUTES.home);
  }
}
