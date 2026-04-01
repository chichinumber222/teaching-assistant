import { Logger } from "./logger";

export class ConsoleLogger implements Logger {
  info(message: string, meta?: Record<string, unknown>): void {
    console.info(message, meta);
  }

  error(message: string, meta?: Record<string, unknown>): void {
    console.error(message, meta);
  }
}
