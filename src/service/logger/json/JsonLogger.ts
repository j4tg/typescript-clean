import { Logger } from '../Logger'
import { stringify } from '../stringify'

export class JsonLogger implements Logger {
  private name: string | undefined

  setName(name: string): this {
    this.name = name
    return this
  }

  debug(message: string, ...details: unknown[]): void {
    console.log({
      date: new Date().toISOString(),
      name: this.name,
      message,
      details: details.map((detail) => {
        if (typeof detail === 'object') {
          detail = stringify(detail)
        }
        return detail
      })
    })
  }
}
