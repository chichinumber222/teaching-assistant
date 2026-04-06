import { APP_ROUTES } from "@/shared/config/routes";
import { NavigationLink } from "@/shared/ui/components/navigation-link";

export default function CreateStudentsPageAction() {
  return <NavigationLink toHref={APP_ROUTES.students} />;
}
