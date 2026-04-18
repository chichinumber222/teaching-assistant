import type { HttpClient } from "@/shared/lib/http/http-client";
import { NextLessonPlanMode } from "@/modules/ai/application/generate-next-lesson-plan/constants";
import { PracticeMode } from "@/modules/ai/application/generate-practice/constants"

export type GenerateNextLessonPLanRequestDto = {
  mode: NextLessonPlanMode;
};

export type GeneratePracticeRequestDto = {
  mode: PracticeMode
}

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
    body: GenerateNextLessonPLanRequestDto,
  ): Promise<GenerateResponseDto> {
    return this.httpClient.request<GenerateResponseDto, GenerateNextLessonPLanRequestDto>({
      method: "POST",
      url: `/api/students/${encodeURIComponent(studentId)}/ai/next-lesson-plan`,
      body,
    });
  }

    async generatePractice(
    studentId: string,
    body: GeneratePracticeRequestDto,
  ): Promise<GenerateResponseDto> {
    return this.httpClient.request<GenerateResponseDto, GeneratePracticeRequestDto>({
      method: "POST",
      url: `/api/students/${encodeURIComponent(studentId)}/ai/practice`,
      body,
    });
  }
}
