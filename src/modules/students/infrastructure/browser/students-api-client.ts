import { HttpClient } from "@/shared/lib/http/http-client";
import { UnderstandingLevel } from "@/modules/students/domain/understanding-level";
import { HomeworkStatus } from "@/modules/students/domain/homework-status";

export type CreateStudentRequestDto = {
  fullName: string;
  subject: string;
  level?: string | null;
  goals?: string | null;
  notes?: string | null;
};

export type CreateStudentResponseDto = {
  id: string;
  fullName: string;
  subject: string;
  level: string | null;
  goals: string | null;
  notes: string | null;
  teacherUserId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateLessonReportRequestDto = {
  lessonAt: string;
  lessonPlan: string;
  uncompletedPlannedWork: string | null;
  understandingLevel: UnderstandingLevel;
  whatWentWell: string | null;
  difficulties: string | null;
  homeworkStatus: HomeworkStatus;
  teacherComment: string | null;
};

export type CreateLessonReportResponseDto = {
  id: string;
  studentId: string;
  lessonAt: string;
  lessonPlan: string;
  uncompletedPlannedWork: string | null;
  understandingLevel: UnderstandingLevel;
  whatWentWell: string | null;
  difficulties: string | null;
  homeworkStatus: HomeworkStatus;
  teacherComment: string | null;
  createdAt: string;
  updatedAt: string;
};

export class StudentsApiClient {
  constructor(private readonly httpClient: HttpClient) {}

  async createStudent(
    payload: CreateStudentRequestDto,
  ): Promise<CreateStudentResponseDto> {
    return await this.httpClient.request<
      CreateStudentResponseDto,
      CreateStudentRequestDto
    >({
      url: "/api/students",
      method: "POST",
      body: payload,
    });
  }

  async createLessonReport(
    payload: CreateLessonReportRequestDto,
    studentId: string,
  ): Promise<CreateLessonReportResponseDto> {
    return await this.httpClient.request<
      CreateLessonReportResponseDto,
      CreateLessonReportRequestDto
    >({
      url: `/api/students/${encodeURIComponent(studentId)}/lesson-reports`,
      method: "POST",
      body: payload,
    });
  }
}
