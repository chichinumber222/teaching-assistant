"use client";

import Link from "next/link";
import Image from "next/image";

import { APP_ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/components/button";
import ArrowLeft from "@/shared/ui/assets/icons/arrow-left.png";

export function BackButton() {
  return (
    <Button asChild variant="ghost" size="sm">
      <Link href={APP_ROUTES.students}>
        <Image src={ArrowLeft} alt="Back" className="mr-2 h-5 w-5" />
      </Link>
    </Button>
  );
}
