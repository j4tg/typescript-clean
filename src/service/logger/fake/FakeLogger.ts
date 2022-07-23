import { Logger } from '../Logger'

export class FakeLogger implements Logger {
  debug (message: string, object?: { [key: string]: any }): void {
    // the fake logger does not print anything for unit testing purposes
  }
}
