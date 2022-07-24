import { Logger } from '../Logger'

export class FakeLogger implements Logger {
  debug(): void {
    // the fake logger does not print anything for unit testing purposes
  }
}
