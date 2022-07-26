import { container } from '@/injection/container'
import { FeatureSyncWithWebhook } from '@/usecase/FeatureSyncWithWebhook'
import { router } from './shared/router'

export const handler = router([
  {
    path: '/webhook',
    method: 'GET',
    handler: async ({ event }) => {
      await container.resolve(FeatureSyncWithWebhook).execute(JSON.parse(event.body || '{}'))
      return {
        body: 'success'
      }
    }
  }
])
