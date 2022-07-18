import { Logger } from "../Logger";

export class MockLogger implements Logger {
  debug(message: string, object?: { [key: string]: any }): void {
    // the mock logger does not print anything for unit testing purposes
  }
}
