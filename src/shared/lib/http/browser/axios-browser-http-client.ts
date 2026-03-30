import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpClient, HttpRequestOptions } from "../http-client";

type AxiosBrowserHttpClientConfig = {
  baseURL: string;
  baseHeaders?: Record<string, string>;
};

export class AxiosBrowserHttpClient implements HttpClient {
  private readonly client: AxiosInstance;

  constructor(config: AxiosBrowserHttpClientConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      headers: {
        "Content-Type": "application/json",
        ...(config.baseHeaders || {}),
      },
    });
  }

  async request<TResponse, TBody = unknown>(
    options: HttpRequestOptions<TBody>,
  ): Promise<TResponse> {
    const config: AxiosRequestConfig<TBody> = {
      method: options.method,
      url: options.url,
      data: options.body,
      headers: options.headers,
    };

    const response = await this.client.request<TResponse>(config);

    return response.data;
  }
}
