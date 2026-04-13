import { AuthLink } from "@/modules/auth/presentation/components/auth-link";
import { APP_ROUTES } from "@/shared/config/routes";

export default function AccountPageAction() {
  return <AuthLink href={APP_ROUTES.students}>К ученикам</AuthLink>;
}
