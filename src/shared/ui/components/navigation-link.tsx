"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/ui/components/button";
import ArrowLeft from "@/shared/ui/assets/icons/arrow-left.png";
import { clsx } from "clsx";

export type NavigationLinkProps = {
  toHref: string;
  variant?: NavigationLinkVariant;
};

export enum NavigationLinkVariant {
  BACK = "BACK",
  FORWARD = "FORWARD",
}

export function NavigationLink({
  toHref,
  variant = NavigationLinkVariant.BACK,
}: NavigationLinkProps) {
  return (
    <Button asChild variant="ghost" size="sm">
      <Link href={toHref}>
        <Image
          src={ArrowLeft}
          alt={variant}
          className={clsx("mr-2 h-5 w-5", {
            "rotate-180": variant === NavigationLinkVariant.FORWARD,
          })}
        />
      </Link>
    </Button>
  );
}
