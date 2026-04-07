import { LogoutView } from "@/modules/auth/presentation/logout/logout-view";
import React from "react";

type Props = {
  children: React.ReactNode;
  pageAction: React.ReactNode;
};

export default function ProtectedLayout({ children, pageAction }: Props) {
  return (
    <main className="flex flex-col gap-4 p-4 w-full max-w-5xl mx-auto">
      <header className="flex items-start gap-4">
        {pageAction}
        <LogoutView className="ml-auto shrink-0" />
      </header>
      {children}
    </main>
  );
}
