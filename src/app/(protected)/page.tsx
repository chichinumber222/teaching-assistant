import { protectedAuthGuard } from "@/modules/auth/infrastructure/server/auth-guard";

export default async function RootPage() {
  await protectedAuthGuard();

  return <div>Start Page</div>;
}
