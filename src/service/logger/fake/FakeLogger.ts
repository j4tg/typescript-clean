import { Logger } from '../Logger'

export class FakeLogger implements Logger {
  setName(): this {
    return this
  }

  debug(): void {
    // the fake logger does not print anything for unit testing purposes
  }
}
