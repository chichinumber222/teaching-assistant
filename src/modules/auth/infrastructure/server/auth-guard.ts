import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import { createAuthServices } from "./auth-service-factory";
import { SessionResolutionResultKind } from "@/modules/auth/application/resolve-session/constants";
import { UserRole } from "@/modules/auth/domain/user-role";
import { getStartPath, getEntryPath } from "@/modules/auth/shared/redirects";

async function requireAuth() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    redirect(getEntryPath());
  }

  const { inspectSession } = createAuthServices();
  const result = inspectSession.execute({ sessionId });

  if (result.kind === SessionResolutionResultKind.UNAUTHENTICATED) {
    redirect(getEntryPath());
  }

  return result.user;
}

export async function teacherRoleAuthGuard() {
  await requireAuth();
}

export async function adminRoleAuthGuard() {
  const user = await requireAuth();

  if (user.role !== UserRole.Admin) {
    redirect(getStartPath(user.role));
  }
}

export async function guestAuthGuard() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    return;
  }

  const { inspectSession } = createAuthServices();
  const result = inspectSession.execute({ sessionId });

  if (result.kind === SessionResolutionResultKind.AUTHENTICATED) {
    redirect(getStartPath(result.user.role));
  }
}

