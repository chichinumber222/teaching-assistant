import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpClient, HttpRequestOptions } from "../http-client";

type AxiosServerHttpClientConfig = {
  baseURL: string;
  baseHeaders?: Record<string, string>;
};

export class AxiosServerHttpClient implements HttpClient {
  private readonly client: AxiosInstance;

  constructor(config: AxiosServerHttpClientConfig) {
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
