import type { HttpClient } from "@/shared/lib/http/http-client";
import { NextLessonPlanMode } from "@/modules/ai/application/generate-next-lesson-plan/constants";

export type GenerateRequestDto = {
  mode: NextLessonPlanMode;
};

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
    body: GenerateRequestDto,
  ): Promise<GenerateResponseDto> {
    return this.httpClient.request<GenerateResponseDto, GenerateRequestDto>({
      method: "POST",
      url: `/api/students/${encodeURIComponent(studentId)}/ai/next-lesson-plan`,
      body,
    });
  }
}
