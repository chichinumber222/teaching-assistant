import { AxiosBrowserHttpClient } from "@/shared/lib/http/browser/axios-browser-http-client";
import { AuthApiClient } from "./auth-api-client";

const httpClient = new AxiosBrowserHttpClient({
  baseURL: "/",
});

export const authClient = new AuthApiClient(httpClient);
