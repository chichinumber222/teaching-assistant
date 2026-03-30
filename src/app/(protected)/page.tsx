import { AIChatView } from "@/modules/ai/presentation/ai-chat/ai-chat-view";
import { BasePage } from "@/shared/ui/containers/base-page";

export default async function RootPage() {
  return (
    <BasePage access="teacher" className="flex gap-4">
      Start Page
      <AIChatView />
    </BasePage>
  );
}
