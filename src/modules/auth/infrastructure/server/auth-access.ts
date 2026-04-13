import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_SESSION_COOKIE_NAME } from "@/modules/auth/shared/auth-cookie";
import { buildAuthServices } from "@/modules/auth/composition/build-auth-services";
import { SessionResolutionResultKind } from "@/modules/auth/application/resolve-session/constants";
import { UserRole } from "@/modules/auth/domain/user-role";
import { getStartPath, getEntryPath } from "@/modules/auth/shared/redirects";
import { User } from "@/modules/auth/domain/user";

type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const mapUserToAuthenticatedUser = (
  user: User,
): AuthenticatedUser  => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
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

  return mapUserToAuthenticatedUser(result.user);
}

export async function requireRole(
  requiredRole: UserRole,
): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect(getEntryPath());
  }

  if (user.role !== requiredRole) {
    redirect(getStartPath(user.role));
  }

  return user;
}

export async function requireGuest(): Promise<void> {
  const user = await getAuthenticatedUser();

  if (user) {
    redirect(getStartPath(user.role));
  }
}
