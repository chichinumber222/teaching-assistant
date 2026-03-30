"use client";

import { Button } from "@/shared/ui/components/button";
import { useAiChat } from "./use-ai-chat";
import Markdown from "react-markdown";

export function AIChatView() {
  const { result, isLoading, globalError, ask } = useAiChat();

  return (
    <div>
      <h1>AI Chat</h1>
      <Button onClick={ask} disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Спросить AI"}
      </Button>
      {globalError && <p style={{ color: "red" }}>{globalError}</p>}
      {result?.text && <Markdown>{result.text}</Markdown>}
    </div>
  );
}
