import { HomeworkStatus } from "@/modules/students/domain/homework-status"

export function formatHomeworkStatus(value: HomeworkStatus): string {
  switch (value) {
    case HomeworkStatus.NotAssigned:
      return "Не задавалась";
    case HomeworkStatus.NotChecked:
      return "Не проверялась";
    case HomeworkStatus.Done:
      return "Выполнена";
    case HomeworkStatus.PartlyDone:
      return "Выполнена частично";
    case HomeworkStatus.NotDone:
      return "Не выполнена";
  }
}
