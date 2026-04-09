import type { HttpClient } from "@/shared/lib/http/http-client";

export type GenerateResponseDto = { text: string };

export class AiApiClient {
  constructor(private readonly httpClient: HttpClient) {}

  async generate(): Promise<GenerateResponseDto> {
    return this.httpClient.request<GenerateResponseDto>({
      method: "POST",
      url: "/api/ai/generate",
    });
  }

  async generateNextLessonPlan(
    studentId: string,
  ): Promise<GenerateResponseDto> {
    return this.httpClient.request<GenerateResponseDto>({
      method: "POST",
      url: `/api/students/${encodeURIComponent(studentId)}/ai/next-lesson-plan`,
    });
  }
}
