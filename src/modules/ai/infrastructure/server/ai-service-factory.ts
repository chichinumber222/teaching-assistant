import "server-only";
import { GenerateText } from "@/modules/ai/application/generate-text";
import { YandexLanguageModel } from "./yandex-language-model";
import { requireValue } from "@/shared/lib/require-value";
import { AxiosServerHttpClient } from "@/shared/lib/http/server/axios-server-http-client";

export function createAiServices() {
  const apiKey = requireValue(process.env.YANDEX_API_KEY, "YANDEX_API_KEY");
  const folderId = requireValue(
    process.env.YANDEX_FOLDER_ID,
    "YANDEX_FOLDER_ID",
  );
  const modelUri = process.env.YANDEX_GPT_MODEL_URI;

  const yandexHttpClient = new AxiosServerHttpClient({
    baseURL: "https://ai.api.cloud.yandex.net",
  });

  const languageModel = new YandexLanguageModel(yandexHttpClient, {
    apiKey,
    folderId,
    modelUri,
  });

  return {
    generateText: new GenerateText(languageModel),
  };
}
