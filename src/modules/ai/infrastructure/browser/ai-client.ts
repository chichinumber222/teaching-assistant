import { AxiosBrowserHttpClient } from "@/shared/lib/http/browser/axios-browser-http-client";
import { AiApiClient } from "./ai-api-client"

const httpClient = new AxiosBrowserHttpClient({
  baseURL: "/",
});

export const aiClient = new AiApiClient(httpClient);