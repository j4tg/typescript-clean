import { container } from 'tsyringe'
import { Unique } from '@/service/unique/Unique'
import { TimestampUnique } from '@/service/unique/timestamp/TimestampUnique'

container.register<Unique>('Unique', TimestampUnique)
