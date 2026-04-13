"use client";

import Link from "next/link";
import { cn } from "@/shared/ui/lib/utils";

export type AuthLinkProps = {
  children: React.ReactNode;
  href: string;
  message?: string;
  className?: string;
  containerClassName?: string;
};

function AuthLink({
  children,
  message,
  href,
  className,
  containerClassName,
}: AuthLinkProps) {
  return (
    <div className={cn("text-center text-sm", containerClassName)}>
      {message && <span className="text-muted-foreground">{message} </span>}
      <Link
        href={href}
        className={cn("font-medium text-primary hover:underline", className)}
      >
        {children}
      </Link>
    </div>
  );
}

export { AuthLink };
