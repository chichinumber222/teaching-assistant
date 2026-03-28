import { protectedAuthGuard } from "@/modules/auth/infrastructure/server/auth-guard";

export default async function ProfilePage() {
  await protectedAuthGuard();

  return <div>Profile Page</div>;
}
