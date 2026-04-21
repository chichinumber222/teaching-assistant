import { APP_ROUTES } from "@/shared/config/routes";
import { NavigationLink } from "@/shared/ui/components/navigation-link";
import { NavigationLinkDirection } from "@/shared/ui/components/navigation-link";

export default function AccountPageAction() {
  return (
    <NavigationLink
      toHref={APP_ROUTES.students}
      label="К ученикам"
      direction={NavigationLinkDirection.BACK}
    />
  );
}
