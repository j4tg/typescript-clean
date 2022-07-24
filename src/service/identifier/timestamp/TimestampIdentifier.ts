import { Logger } from '@/service/logger/Logger'
import { inject, injectable } from 'tsyringe'
import { Identifier } from '../Identifier'

@injectable()
export class TimestampIdentifier implements Identifier {
  constructor(@inject('Logger') private readonly logger: Logger) {
    this.logger.setName('Service:Identifier:Timestamp')
  }

  unique(): string {
    this.logger.debug('unique')
    return new Date().getTime().toString()
  }
}
