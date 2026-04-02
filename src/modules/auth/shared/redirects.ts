import { UserRole } from "@/modules/auth/domain/user-role";
import { APP_ROUTES } from "@/shared/config/routes"

export function getStartPath(role: UserRole): string {
  switch (role) {
    case UserRole.Admin:
      return APP_ROUTES.admin;

    case UserRole.Teacher:
      return APP_ROUTES.students;

    default:
      return APP_ROUTES.students;
  }
}

export function getEntryPath(): string {
  return APP_ROUTES.login;
}
