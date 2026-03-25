export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type HttpRequestOptions<TBody = unknown> = {
  method: HttpMethod;
  url: string;
  body?: TBody;
  headers?: Record<string, string>;
};

export interface HttpClient {
  request<TResponse, TBody = unknown>(
    options: HttpRequestOptions<TBody>,
  ): Promise<TResponse>;
}