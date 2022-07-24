import { Logger } from '../Logger'
import { stringify } from '../stringify'
import debug from 'debug'

export class PrettyLogger implements Logger {
  private readonly color = {
    message: '\x1b[36m',
    detail: '\x1b[90m',
    reset: '\x1b[0m'
  }

  private namespace = '@'

  setName(name: string): this {
    this.namespace += ':' + name
    return this
  }

  debug(message: string, ...details: unknown[]): void {
    debug(this.namespace)(
      `${this.color.message}${message}${this.color.reset}`,
      ...details.map((detail) => {
        if (typeof detail === 'object') {
          detail = stringify(detail)
        }

        return `${this.color.detail}${detail}${this.color.reset}`
      })
    )
  }
}
