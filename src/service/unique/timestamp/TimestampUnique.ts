import { Logger } from '@/service/logger/Logger'
import { inject, injectable } from 'tsyringe'
import { Unique } from '../Unique'

@injectable()
export class TimestampUnique implements Unique {
  constructor(@inject('Logger') private readonly logger: Logger) {}

  id(): string {
    this.logger.debug('timestamp identifier unique')
    return new Date().getTime().toString()
  }
}
