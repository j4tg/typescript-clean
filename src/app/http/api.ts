import { container } from '@/injection/container'
import { GetAllFeatures } from '@/usecase/GetAllFeatures'
import { router } from './shared/router'

export const handler = router([
  {
    path: '/api/features',
    method: 'GET',
    handler: async () => {
      const features = await container.resolve(GetAllFeatures).execute()
      return {
        body: features
      }
    }
  }
])
