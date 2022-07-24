import { container } from '@/injection/container'
import { FeatureSyncWithWebhook } from '@/usecase/FeatureSyncWithWebhook'
import { httpEventHandler } from './shared/http-event-handler'

export const handler = httpEventHandler(async (event) => {
  await container.resolve(FeatureSyncWithWebhook).execute(JSON.parse(event.body || '{}'))

  return {
    body: {
      message: 'Handler api',
    },
  }
})
