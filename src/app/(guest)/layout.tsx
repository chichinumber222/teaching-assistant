import { cn } from "@/shared/ui/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function GuestLayout({ children }: Props) {
  return (
    <main
      className={cn("flex", "min-h-screen", "items-center", "justify-center")}
    >
      {children}
    </main>
  );
}
