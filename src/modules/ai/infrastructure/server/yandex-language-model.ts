import "server-only";

import type { HttpClient } from "@/shared/lib/http/http-client";
import type {
  LanguageModel,
  LanguageModelResponse,
  LanguageModelTextInput,
} from "@/modules/ai/domain/language-model";

type YandexLanguageModelConfig = {
  apiKey: string;
  folderId: string;
  modelUri?: string;
};

type YandexLanguageModelRequestBody = {
  modelUri: string;
  completionOptions: {
    stream: boolean;
    temperature: number;
    maxTokens: string;
  };
  messages: LanguageModelTextInput["messages"];
};

type YandexLanguageModelResponse = {
  result?: {
    alternatives?: Array<{
      message?: {
        role?: string;
        text?: string;
      };
      status?: string;
    }>;
    usage?: {
      inputTextTokens?: string;
      completionTokens?: string;
      totalTokens?: string;
    };
    modelVersion?: string;
  };
};

export class YandexLanguageModel implements LanguageModel {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly config: YandexLanguageModelConfig,
  ) {}

  async generateText(
    input: LanguageModelTextInput,
  ): Promise<LanguageModelResponse> {
    const data = await this.httpClient.request<
      YandexLanguageModelResponse,
      YandexLanguageModelRequestBody
    >({
      method: "POST",
      url: "/foundationModels/v1/completion",
      headers: {
        Authorization: `Api-Key ${this.config.apiKey}`,
      },
      body: {
        modelUri:
          this.config.modelUri ??
          `gpt://${this.config.folderId}/yandexgpt/latest`,
        completionOptions: {
          stream: false,
          temperature: input.temperature ?? 0.3,
          maxTokens: String(input.maxTokens ?? 200),
        },
        messages: input.messages,
      },
    });

    const outputText = data.result?.alternatives?.[0]?.message?.text?.trim();
    const totalTokens = data.result?.usage?.totalTokens;

    const text = outputText + (totalTokens ? totalTokens : "");

    if (!text) {
      throw new Error("YandexGPT response does not contain generated text");
    }

    return { text };
  }
}
