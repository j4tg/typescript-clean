import { Identifier } from '../Identifier'

export class TimestampIdentifier implements Identifier {
  unique(): string {
    return new Date().getTime().toString()
  }
}
