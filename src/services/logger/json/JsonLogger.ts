import { Logger } from "../Logger";
import stringify from "fast-safe-stringify";

export class JsonLogger implements Logger {
  debug(message: string, object?: { [key: string]: any }): void {
    console.log({
      date: new Date().toISOString(),
      message: message,
      object: object ?? stringify(object),
    });
  }
}
