import { UnderstandingLevel } from "@/modules/students/domain/understanding-level"

export function formatUnderstandingLevel(value: UnderstandingLevel): string {
  switch (value) {
    case UnderstandingLevel.Low:
      return "низкий";
    case UnderstandingLevel.Medium:
      return "средний";
    case UnderstandingLevel.High:
      return "высокий";
  }
}