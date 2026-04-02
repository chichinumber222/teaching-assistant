import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import { buildAuthServices } from "@/modules/auth/composition/build-auth-services";
import { SessionResolutionResultKind } from "@/modules/auth/application/resolve-session/constants";
import { UserRole } from "@/modules/auth/domain/user-role";
import { getStartPath, getEntryPath } from "@/modules/auth/shared/redirects";
import { User } from "@/modules/auth/domain/user";

async function getUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    return null;
  }

  const { inspectSession } = buildAuthServices();
  const result = inspectSession.execute({ sessionId });

  if (result.kind === SessionResolutionResultKind.UNAUTHENTICATED) {
    return null;
  }

  return result.user;
}

export async function requireRole(requiredRole: UserRole): Promise<User> {
  const user = await getUser();

  if (!user) {
    redirect(getEntryPath());
  }

  if (user.role !== requiredRole) {
    redirect(getStartPath(user.role));
  }

  return user;
}

export async function requireGuest(): Promise<void> {
  const user = await getUser();

  if (user) {
    redirect(getStartPath(user.role));
  }
}
