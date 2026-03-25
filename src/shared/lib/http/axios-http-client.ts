import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpClient, HttpRequestOptions } from "./http-client";

export class AxiosHttpClient implements HttpClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "/",
      headers: {
        "Content-Type": "application/json",
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