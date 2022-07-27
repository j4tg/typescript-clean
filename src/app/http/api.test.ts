import { APIGatewayEvent, Context } from 'aws-lambda'
import { mock } from 'jest-mock-extended'
import { container } from '@/injection/container'
import { GetAllFeatures } from '@/usecase/GetAllFeatures'
import { handler } from './api'

test('deberia invocar el caso de uso get all features', async () => {
  // Arrange
  const event = mock<APIGatewayEvent>({
    path: '/api/features',
    httpMethod: 'GET'
  })
  const context = mock<Context>()
  const usecase = mock<GetAllFeatures>()
  const resolveMock = jest.spyOn(container, 'resolve').mockReturnValue(usecase)

  // Act
  await handler(event, context)

  // Assert
  expect(resolveMock).toHaveBeenCalledWith(GetAllFeatures)
  expect(usecase.execute).toHaveBeenCalled()
})
