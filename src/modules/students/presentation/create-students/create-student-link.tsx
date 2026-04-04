import Link from "next/link";

import { APP_ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/components/button";

export function CreateStudentLink({ className }: { className?: string }) {
  return (
    <>
      <Button size="lg" className={`hidden md:inline-block ${className}`}>
        <Link href={APP_ROUTES.studentsNew}>Добавить ученика</Link>
      </Button>

      <Button
        size="icon-lg"
        className={`rounded-full shadow-md md:hidden inline-block ${className}`}
      >
        <Link href={APP_ROUTES.studentsNew} aria-label="Добавить ученика">
          <span>+</span>
        </Link>
      </Button>
    </>
  );
}
