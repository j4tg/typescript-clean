import { APIGatewayEvent, Context } from 'aws-lambda'
import { mock } from 'jest-mock-extended'
import { GetAllFeatures } from '@/usecase/GetAllFeatures'

// import { handler } from './api';
// import * as tsrynge from 'tsyringe';
// import * as injection from '@/injection/container';

test('deberia invocar el caso de uso get all features', async () => {
  // Arrange

  const { handler } = require('./api')

  // const usecase = mock<GetAllFeatures>()

  // jest.doMock('@/injection/container', () => {
  //   const { container } = jest.requireActual('@/injection/container')

  //   const scope = container.createChildContainer()
  //   scope.registerInstance(GetAllFeatures, usecase)
  //   return { container: scope }
  // })

  // const { handler } = require('./api')

  // const event = mock<APIGatewayEvent>({
  //   path: '/api/features',
  //   httpMethod: 'GET'
  // })
  // const context = mock<Context>()

  // await handler(event, context)

  // const scope = tsrynge.container.createChildContainer();
  // scope.registerInstance(GetAllFeatures, usecase);

  // (
  //   injection.container as jest.Mocked<typeof tsrynge.container>
  // ).resolve.mockImplementation((token) => scope.resolve(token));

  // // Act
  // await handler(event, context);

  // // Assert
  // expect(usecase.execute).toHaveBeenCalled();
})
