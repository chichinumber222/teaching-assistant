import type { HttpClient } from "@/shared/lib/http/http-client";
import { GenerationMode } from "@/modules/ai/domain/generation-mode";

export type GenerateNextLessonPLanRequestDto = {
  mode: GenerationMode;
};

export type GeneratePracticeRequestDto = {
  mode: GenerationMode;
};

export type GenerateTaskExamplesRequestDto = {
  mode: GenerationMode;
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
    body: GenerateNextLessonPLanRequestDto,
  ): Promise<GenerateResponseDto> {
    return this.httpClient.request<
      GenerateResponseDto,
      GenerateNextLessonPLanRequestDto
    >({
      method: "POST",
      url: `/api/students/${encodeURIComponent(studentId)}/ai/next-lesson-plan`,
      body,
    });
  }

  async generatePractice(
    studentId: string,
    body: GeneratePracticeRequestDto,
  ): Promise<GenerateResponseDto> {
    return this.httpClient.request<
      GenerateResponseDto,
      GeneratePracticeRequestDto
    >({
      method: "POST",
      url: `/api/students/${encodeURIComponent(studentId)}/ai/practice`,
      body,
    });
  }

  async generateTaskExamples(
    studentId: string,
    body: GenerateTaskExamplesRequestDto,
  ): Promise<GenerateResponseDto> {
    return this.httpClient.request<
      GenerateResponseDto,
      GenerateTaskExamplesRequestDto
    >({
      method: "POST",
      url: `/api/students/${encodeURIComponent(studentId)}/ai/task-examples`,
      body,
    });
  }
}
