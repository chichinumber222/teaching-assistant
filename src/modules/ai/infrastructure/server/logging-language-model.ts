import type {
  LanguageModel,
  LanguageModelResponse,
  LanguageModelTextInput,
} from "@/modules/ai/domain/language-model";
import type { Logger } from "@/shared/lib/logger/logger";

export class LoggingLanguageModel implements LanguageModel {
  constructor(
    private readonly languageModel: LanguageModel,
    private readonly logger: Logger,
  ) {}

  async generateText(
    input: LanguageModelTextInput,
  ): Promise<LanguageModelResponse> {
    const startedAt = Date.now();

    try {
      const result = await this.languageModel.generateText(input);

      this.logger.info("Language model generation succeeded", {
        durationMs: Date.now() - startedAt,
        usage: result.usage,
        messageCount: input.messages.length,
        temperature: input.temperature,
        maxTokens: input.maxTokens,
      });

      return result;
    } catch (error) {
      this.logger.error("Language model generation failed", {
        durationMs: Date.now() - startedAt,
        messageCount: input.messages.length,
        temperature: input.temperature,
        maxTokens: input.maxTokens,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }
}
