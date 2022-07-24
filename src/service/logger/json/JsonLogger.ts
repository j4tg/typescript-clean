import { Logger } from '../Logger'
import { stringify } from '../stringify'

export class JsonLogger implements Logger {
  debug(message: string, object?: { [key: string]: any }): void {
    console.log({
      date: new Date().toISOString(),
      message,
      object: stringify(object),
    })
  }
}
