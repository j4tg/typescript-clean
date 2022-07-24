import { container } from '@/injection/container'
import { GetAllFeatures } from '@/usecase/GetAllFeatures'
import { httpEventHandler } from './shared/http-event-handler'

export const handler = httpEventHandler(async () => {
  const features = await container.resolve(GetAllFeatures).execute()

  return {
    body: features
  }
})
