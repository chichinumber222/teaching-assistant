"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/ui/components/button";
import ArrowLeft from "@/shared/ui/assets/icons/arrow-left.png";

export type BackButtonProps = {
  toHref: string
}

export function BackButton({ toHref }: BackButtonProps) {
  return (
    <Button asChild variant="ghost" size="sm">
      <Link href={toHref}>
        <Image src={ArrowLeft} alt="Back" className="mr-2 h-5 w-5" />
      </Link>
    </Button>
  );
}
