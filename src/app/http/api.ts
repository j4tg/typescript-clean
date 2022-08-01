import { container } from '@/injection/container'
import { GetAllFeatures } from '@/usecase/GetAllFeatures'
import { Router } from './shared/Router'

const router = container.resolve(Router)

router.route('GET', '/api/features', async () => {
  return {
    body: await container.resolve(GetAllFeatures).execute()
  }
})

export const handler = router.handler()
