"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { studentsClient } from "@/modules/students/infrastructure/browser/students-client";
import { CreateStudentRequestDto } from "@/modules/students/infrastructure/browser/students-api-client";
import { APP_ROUTES } from "@/shared/config/routes";

type UseCreateStudentResult = {
  createStudent: (payload: CreateStudentRequestDto) => Promise<boolean>;
  globalError: string | null;
  isGlobalLoading: boolean;
  clearGlobalError: () => void;
};

export function useCreateStudent(): UseCreateStudentResult {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const clearGlobalError = () => {
    setGlobalError(null);
  };

  const createStudent = async (
    payload: CreateStudentRequestDto,
  ): Promise<boolean> => {
    setGlobalError(null);
    setIsGlobalLoading(true);

    try {
      await studentsClient.createStudent(payload);

      router.refresh();
      router.push(APP_ROUTES.students);

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
        } else if (status === 403) {
          setGlobalError("Регистрация временно недоступна");
        } else if (status === 400) {
          setGlobalError(
            "Некорректные данные. Проверьте введенную информацию и попробуйте снова",
          );
        } else if (status === 404) {
          setGlobalError("Пользователь не найден");
        } else {
          setGlobalError(
            "Не удалось создать ученика. Попробуйте еще раз позже",
          );
        }
      } else {
        setGlobalError("Не удалось создать ученика. Попробуйте еще раз позже");
      }

      return false;
    } finally {
      setIsGlobalLoading(false);
    }
  };

  return {
    createStudent,
    globalError,
    isGlobalLoading,
    clearGlobalError,
  };
}
