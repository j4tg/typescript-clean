import { APIGatewayEvent, Context } from 'aws-lambda'
import { mock } from 'jest-mock-extended'
import { container } from '@/injection/container'
import { GetAllFeatures } from '@/usecase/GetAllFeatures'
import { Logger } from '@/service/logger/Logger'
import { Router } from './shared/Router'
import { handler } from './api'

test('deberia invocar el caso de uso get all features', async () => {
  // Arrange
  const router = new Router(mock<Logger>())
  const usecase = mock<GetAllFeatures>()
  const resolveMock = jest
    .spyOn(container, 'resolve')
    .mockReturnValueOnce(router)
    .mockReturnValueOnce(usecase)
  const event = mock<APIGatewayEvent>({
    path: '/api/features',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  // Act
  await handler(event, context)

  // Assert
  expect(resolveMock).toHaveBeenCalledTimes(2)
  expect(usecase.execute).toHaveBeenCalled()
})
