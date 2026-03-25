import type { UserRole } from "@/modules/auth/domain/user-role";

export function getLoginRedirectPath(role: UserRole): string {
  switch (role) {
    case "admin":
      return "/admin";

    case "teacher":
      return "/";

    default:
      return "/";
  }
}
