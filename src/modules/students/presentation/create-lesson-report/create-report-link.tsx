import Link from "next/link";

import { Button } from "@/shared/ui/components/button";

export function CreateReportLink({ href, className }: { href: string; className?: string }) {
  return (
    <>
      <Button size="lg" className={`hidden md:inline-block ${className}`}>
        <Link href={href}>+ Добавить карточку</Link>
      </Button>

      <Button
        size="icon-lg"
        className={`shadow-md md:hidden inline-block ${className}`}
      >
        <Link href={href} aria-label="Добавить карточку">
          <span>+</span>
        </Link>
      </Button>
    </>
  );
}
