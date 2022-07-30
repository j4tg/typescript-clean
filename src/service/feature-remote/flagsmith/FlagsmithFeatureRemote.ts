import { inject, injectable } from 'tsyringe'
import { Logger } from '@/service/logger/Logger'
import { FeatureRemote, Feature } from '../FeatureRemote'
import { WebhookValidator } from './webhook/WebhookValidator'

@injectable()
export class FlagsmithFeatureRemote implements FeatureRemote {
  constructor(
    @inject('Logger')
    private readonly logger: Logger,
    private readonly webhookValidator: WebhookValidator
  ) {}

  parseWebhook(webhook: unknown): Feature {
    this.logger.debug('flagsmith feature remote webhook')

    if (!this.webhookValidator.guard(webhook)) {
      throw new Error('Invalid webhook payload')
    }

    if (webhook.event_type === 'FLAG_DELETED') {
      if (webhook.data.previous_state == null) {
        throw new Error('previous_state is required')
      }

      const { name } = webhook.data.previous_state.feature
      return {
        name,
        isEnabled: false,
        isDeleted: true
      }
    }

    if (webhook.data.new_state == null) {
      throw new Error('new_state is required')
    }

    const { name } = webhook.data.new_state.feature
    const isEnabled = !!webhook.data.new_state.enabled

    return {
      name,
      isEnabled,
      isDeleted: false
    }
  }
}
