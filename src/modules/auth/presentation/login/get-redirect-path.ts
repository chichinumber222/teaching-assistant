import { UserRole } from "@/modules/auth/domain/user-role";

export function getLoginRedirectPath(role: UserRole): string {
  switch (role) {
    case UserRole.Admin:
      return "/admin";

    case UserRole.Teacher:
      return "/";

    default:
      return "/";
  }
}
