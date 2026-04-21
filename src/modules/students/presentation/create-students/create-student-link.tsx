import Link from "next/link";

import { APP_ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/components/button";
import { IconPlus } from "@tabler/icons-react";
import { cn } from "@/shared/ui/lib/utils";

export function CreateStudentLink({ className }: { className?: string }) {
  return (
    <>
      <Button
        asChild
        size="lg"
        className={cn("hidden md:inline-flex", className)}
      >
        <Link href={APP_ROUTES.studentsNew}>
          <IconPlus aria-hidden="true" className="size-4" stroke={2.2} />
          <span>Добавить ученика</span>
        </Link>
      </Button>

      <Button
        size="icon-lg"
        className={cn(
          "inline-flex rounded-full shadow-md md:hidden",
          className,
        )}
      >
        <Link href={APP_ROUTES.studentsNew} aria-label="Добавить ученика">
          <IconPlus aria-hidden="true" className="size-5" stroke={2.4} />
        </Link>
      </Button>
    </>
  );
}
