import { AccountLink } from "@/modules/auth/presentation/account/account-link";
import { LogoutView } from "@/modules/auth/presentation/logout/logout-view";
import React from "react";

type Props = {
  children: React.ReactNode;
  pageAction: React.ReactNode;
};

export default function ProtectedLayout({ children, pageAction }: Props) {
  return (
    <main className="flex flex-col gap-4 p-4 w-full max-w-5xl mx-auto">
      <header className="flex items-center gap-4 max-h-8">
        {pageAction}
        <div className="ml-auto shrink-0 flex items-center gap-1">
          <AccountLink />
          <LogoutView />
        </div>
      </header>
      {children}
    </main>
  );
}
