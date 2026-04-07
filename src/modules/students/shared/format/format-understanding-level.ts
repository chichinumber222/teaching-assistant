import { UnderstandingLevel } from "@/modules/students/domain/understanding-level";

export function formatUnderstandingLevel(value: UnderstandingLevel): string {
  switch (value) {
    case UnderstandingLevel.Low:
      return "Низкий";
    case UnderstandingLevel.Medium:
      return "Средний";
    case UnderstandingLevel.High:
      return "Высокий";
  }
}
