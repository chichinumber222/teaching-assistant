import Link from "next/link";

import { Button } from "@/shared/ui/components/button";
import { IconPlus } from "@tabler/icons-react";
import { cn } from "@/shared/ui/lib/utils";

export function CreateReportLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <>
      <Button
        asChild
        size="lg"
        className={cn(`hidden md:inline-flex`, className)}
      >
        <Link href={href}>
          <IconPlus aria-hidden="true" className="size-4" stroke={2.2} />
          <span>Добавить карточку</span>
        </Link>
      </Button>

      <Button
        asChild
        size="icon-lg"
        className={cn(`inline-flex shadow-md md:hidden`, className)}
      >
        <Link href={href} aria-label="Добавить карточку">
          <IconPlus aria-hidden="true" className="size-5" stroke={2.4} />
        </Link>
      </Button>
    </>
  );
}
