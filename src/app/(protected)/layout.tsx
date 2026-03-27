import { LogoutView } from "@/modules/auth/presentation/logout/logout-view";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: Props) {
  

  return (
    <div>
      {children}
      <LogoutView className="absolute top-4 right-4" />
    </div>
  );
}
