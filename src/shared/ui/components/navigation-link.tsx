import Link from "next/link";
import { Button } from "@/shared/ui/components/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/shared/ui/lib/utils";

export enum NavigationLinkDirection {
  BACK = "BACK",
  FORWARD = "FORWARD",
}

export type NavigationLinkProps = {
  toHref: string;
  label?: string;
  ariaLabel?: string;
  direction?: NavigationLinkDirection;
  className?: string;
};

export function NavigationLink({
  toHref,
  label,
  ariaLabel,
  direction = NavigationLinkDirection.BACK,
  className,
}: NavigationLinkProps) {
  const isBack = direction === NavigationLinkDirection.BACK;
  const Icon = isBack ? IconChevronLeft : IconChevronRight;
  const iconClassName = label ? "size-5" : "size-6";

  return (
    <Button
      asChild
      variant="ghost"
      size={label ? "lg" : "icon-lg"}
      className={cn(
        "text-muted-foreground hover:text-foreground",
        label && "gap-1.5 px-2",
        className,
      )}
    >
      <Link href={toHref} aria-label={label ?? ariaLabel}>
        {isBack ? (
          <>
            <Icon aria-hidden="true" className={iconClassName} stroke={1.8} />
            {label ? <span>{label}</span> : null}
          </>
        ) : (
          <>
            {label ? <span>{label}</span> : null}
            <Icon aria-hidden="true" className={iconClassName} stroke={1.8} />
          </>
        )}
      </Link>
    </Button>
  );
}
