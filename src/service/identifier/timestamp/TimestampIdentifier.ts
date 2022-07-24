import { Logger } from '@/service/logger/Logger'
import { inject, injectable } from 'tsyringe'
import { Identifier } from '../Identifier'

@injectable()
export class TimestampIdentifier implements Identifier {
  constructor(@inject('Logger') private readonly logger: Logger) {}

  unique(): string {
    this.logger.debug('timestamp identifier unique')
    return new Date().getTime().toString()
  }
}
