import { LogoutView } from "@/modules/auth/presentation/logout/logout-view";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: Props) {
  return (
    <main className="flex flex-col gap-4 p-4">
      <LogoutView className="self-end" />
      {children}
    </main>
  );
}
