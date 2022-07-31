import { inject, injectable } from 'tsyringe'
import { Logger } from '@/service/logger/Logger'
import { FeatureSource, Feature } from '../FeatureSource'
import { WebhookValidator } from './webhook/WebhookValidator'
import { ValidationError } from '@/error/ValidationError'

@injectable()
export class FlagsmithFeatureSource implements FeatureSource {
  constructor(
    @inject('Logger')
    private readonly logger: Logger,
    private readonly webhookValidator: WebhookValidator
  ) {}

  parseWebhook(webhook: unknown): Feature {
    this.logger.debug('flagsmith feature source webhook')

    if (!this.webhookValidator.isValid(webhook)) {
      throw new ValidationError('Invalid webhook payload')
    }

    if (webhook.event_type === 'FLAG_DELETED') {
      if (webhook.data.previous_state == null) {
        throw new ValidationError('previous_state is required')
      }

      const { name } = webhook.data.previous_state.feature
      return {
        name,
        isEnabled: false,
        isDeleted: true
      }
    }

    if (webhook.data.new_state == null) {
      throw new ValidationError('new_state is required')
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
