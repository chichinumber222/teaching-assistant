import { AxiosHttpClient } from "@/shared/lib/http/axios-http-client";
import { AuthApiClient } from "./auth-api-client";

const httpClient = new AxiosHttpClient();

export const authClient = new AuthApiClient(httpClient);
