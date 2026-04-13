import { APP_ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/components/button";
import Image from "next/image";
import UserIcon from "@/shared/ui/assets/icons/user.png";
import Link from "next/link";
import { cn } from "@/shared/ui/lib/utils";

export type AccountLinkProps = {
  className?: string;
};

export function AccountLink({ className }: AccountLinkProps) {
  return (
    <Button asChild variant="ghost" size="sm">
      <Link href={APP_ROUTES.account}>
        <Image
          src={UserIcon}
          alt="Account"
          className={cn("h-6 w-6", className)}
        />
      </Link>
    </Button>
  );
}
