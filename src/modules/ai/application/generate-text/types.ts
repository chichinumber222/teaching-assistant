import type { LanguageModelMessage } from "@/modules/ai/domain/language-model";

export type GenerateTextInput = {
  messages: LanguageModelMessage[];
  temperature?: number;
  maxTokens?: number;
};

export type GenerateTextResult = {
  text: string;
};
