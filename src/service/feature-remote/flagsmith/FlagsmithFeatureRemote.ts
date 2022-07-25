import { inject, injectable } from 'tsyringe'
import { Catch } from '@/error/catch'
import { Logger } from '@/service/logger/Logger'
import { FeatureRemote, Feature } from '../FeatureRemote'
import { WebhookPayload } from './WebhookPayload'

@injectable()
export class FlagsmithFeatureRemote implements FeatureRemote {
  constructor(@inject('Logger') private readonly logger: Logger) {}

  @Catch()
  parseWebhook(webhook: unknown): Feature {
    this.logger.debug('flagsmith feature remote webhook')

    const payload = WebhookPayload.parse(webhook)

    if (payload.event_type === 'FLAG_DELETED') {
      if (payload.data.previous_state == null) {
        throw new Error('previous_state is required')
      }

      const { name } = payload.data.previous_state.feature
      return {
        name,
        isEnabled: false,
        isDeleted: true
      }
    }

    if (payload.data.new_state == null) {
      throw new Error('new_state is required')
    }

    const { name } = payload.data.new_state.feature
    const isEnabled = !!payload.data.new_state.enabled

    return {
      name,
      isEnabled,
      isDeleted: false
    }
  }
}
