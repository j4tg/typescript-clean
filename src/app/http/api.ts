import { container } from '@/injection/container'
import { GetAllFeatures } from '@/usecase/GetAllFeatures'
import { APIGatewayEvent, Context } from 'aws-lambda'
import { Router } from './shared/Router'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const router = container.resolve(Router)

  router.route('GET', '/api/features', async () => {
    return {
      body: await container.resolve(GetAllFeatures).execute()
    }
  })

  return await router.handler(event, context)
}
