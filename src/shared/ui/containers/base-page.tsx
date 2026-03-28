import {
  guestAuthGuard,
  protectedAuthGuard,
} from "@/modules/auth/infrastructure/server/auth-guard";
import React from "react";

export const accessGuards = {
  protected: protectedAuthGuard,
  guest: guestAuthGuard,
} as const;

export type RouteAccess = keyof typeof accessGuards;

export type BasePageProps = {
  children: React.ReactNode;
  access: RouteAccess;
  className?: string
};

export async function BasePage({ children, access, className }: BasePageProps) {
  await accessGuards[access]();

  return <main className={className}>{children}</main>;
}
