"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { studentsClient } from "@/modules/students/infrastructure/browser/students-client";
import { CreateLessonReportRequestDto } from "@/modules/students/infrastructure/browser/students-api-client";
import { APP_ROUTES } from "@/shared/config/routes";

type UseCreateReportResult = {
  createReport: (
    payload: CreateLessonReportRequestDto,
    studentId: string,
  ) => Promise<boolean>;
  globalError: string | null;
  isGlobalLoading: boolean;
  clearGlobalError: () => void;
};

export function useCreateReport(): UseCreateReportResult {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const clearGlobalError = () => {
    setGlobalError(null);
  };

  const createReport = async (
    payload: CreateLessonReportRequestDto,
    studentId: string,
  ): Promise<boolean> => {
    setGlobalError(null);
    setIsGlobalLoading(true);

    try {
      await studentsClient.createLessonReport(payload, studentId);

      router.refresh();
      router.push(APP_ROUTES.student(studentId));

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 403) {
          setGlobalError("У вас нет прав для выполнения этого действия");
        } else if (status === 401) {
          setGlobalError(
            "Вы не авторизованы. Пожалуйста, войдите в систему и попробуйте снова",
          );
        } else if (status === 400) {
          setGlobalError(
            "Некорректные данные. Проверьте введенную информацию и попробуйте снова",
          );
        } else if (status === 404) {
          setGlobalError("Учитель или ученик не найдены");
        } else {
          setGlobalError(
            "Не удалось создать карточку (отчет). Попробуйте еще раз позже",
          );
        }
      } else {
        setGlobalError(
          "Не удалось создать карточку (отчет). Попробуйте еще раз позже",
        );
      }

      return false;
    } finally {
      setIsGlobalLoading(false);
    }
  };

  return {
    createReport,
    globalError,
    isGlobalLoading,
    clearGlobalError,
  };
}
