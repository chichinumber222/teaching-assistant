import { remark } from "remark";
import stripMarkdown from "strip-markdown";

export function markdownToPlainText(markdown: string): string {
  const file = remark().use(stripMarkdown).processSync(markdown);
  return String(file).trim();
}
