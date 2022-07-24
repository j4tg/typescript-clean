import { Logger } from '../Logger'
import { stringify } from '../stringify'

export class PrettyLogger implements Logger {
  private readonly color = {
    message: '\x1b[36m',
    body: '\x1b[90m',
    reset: '\x1b[0m',
  }

  debug(message: string, object?: { [key: string]: unknown }): void {
    const date = new Date().toISOString()
    const body: string = object != null ? stringify(object) : ''

    console.log(
      `[${date}] ` +
        `${this.color.message}${message}${this.color.reset} ` +
        `${this.color.body}${body}${this.color.reset}`
    )
  }
}
