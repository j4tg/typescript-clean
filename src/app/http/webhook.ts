import { APIGatewayEvent, Context } from 'aws-lambda'
import { container } from '@/injection/container'
import { FeatureSyncWithWebhook } from '@/usecase/FeatureSyncWithWebhook'
import { Router } from './shared/Router'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const router = container.resolve(Router)

  router.route('GET', '/webhook', async () => {
    await container
      .resolve(FeatureSyncWithWebhook)
      .execute(JSON.parse(event.body || '{}'))
    return { body: 'success' }
  })

  return await router.handler(event, context)
}
