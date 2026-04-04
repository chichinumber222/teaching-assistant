import { AxiosBrowserHttpClient } from "@/shared/lib/http/browser/axios-browser-http-client";
import { StudentsApiClient } from "./students-api-client";

const httpClient = new AxiosBrowserHttpClient({
  baseURL: "/",
});

export const studentsClient = new StudentsApiClient(httpClient);
