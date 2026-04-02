import { getEntryPath } from "@/modules/auth/shared/redirects";
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect(getEntryPath());
}
