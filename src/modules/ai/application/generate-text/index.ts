import type { LanguageModel } from "@/modules/ai/domain/language-model";
import type { GenerateTextInput, GenerateTextResult } from "./types"

export class GenerateText {
  constructor(private readonly languageModel: LanguageModel) {}

  async execute(input: GenerateTextInput): Promise<GenerateTextResult> {
    const { text } = await this.languageModel.generateText({
      messages: input.messages,
      temperature: input.temperature,
      maxTokens: input.maxTokens,
    });

    return { text };
  }
}
