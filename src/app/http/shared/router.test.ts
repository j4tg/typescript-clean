import { router } from './router'
import { mock } from 'jest-mock-extended'
import { APIGatewayEvent, Context } from 'aws-lambda'

test('deberia invocar la función que coincida con la ruta de metodo get', async () => {
  // Arrange
  const mockHandler = jest.fn(() => Promise.resolve({}))
  const mockNotHandler1 = jest.fn(() => Promise.resolve({}))
  const mockNotHandler2 = jest.fn(() => Promise.resolve({}))

  const handler = router([
    {
      path: '/handler1',
      method: 'GET',
      handler: mockNotHandler1
    },
    {
      path: '/handler2',
      method: 'GET',
      handler: mockHandler
    },
    {
      path: '/handler3',
      method: 'GET',
      handler: mockNotHandler2
    }
  ])

  const event = mock<APIGatewayEvent>({
    path: '/handler2',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  // Act
  await handler(event, context)

  // Assert
  expect(mockHandler).toHaveBeenCalled()
  expect(mockNotHandler1).not.toHaveBeenCalled()
  expect(mockNotHandler2).not.toHaveBeenCalled()
})

test('deberia retonar status http 200 por defecto', async () => {
  // Arrange
  const mockHandler = jest.fn(() => Promise.resolve({}))
  const handler = router([
    {
      path: '/handler',
      method: 'GET',
      handler: mockHandler
    }
  ])

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  // Act
  const response = await handler(event, context)

  // Assert
  expect(mockHandler).toHaveBeenCalled()
  expect(response.statusCode).toEqual(200)
})

test('deberia permitir cambiar status http', async () => {
  // Arrange
  const mockHandler = jest.fn(() => Promise.resolve({ statusCode: 201 }))
  const handler = router([
    {
      path: '/handler',
      method: 'GET',
      handler: mockHandler
    }
  ])

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  // Act
  const response = await handler(event, context)

  // Assert
  expect(mockHandler).toHaveBeenCalled()
  expect(response.statusCode).toEqual(201)
})

test('deberia convertir la respuesta a una cadena si el resultado del metodo es un objeto', async () => {
  // Arrange
  const mockHandler = jest.fn(() =>
    Promise.resolve({ body: { success: true } })
  )
  const handler = router([
    {
      path: '/handler',
      method: 'GET',
      handler: mockHandler
    }
  ])

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  // Act
  const response = await handler(event, context)

  // Assert
  expect(mockHandler).toHaveBeenCalled()
  expect(response.body).toEqual('{"success":true}')
})

test('deberia devolver error 404 si no coincide ninguna ruta', async () => {
  // Arrange
  const handler = router([])

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  // Act
  const response = await handler(event, context)

  // Assert
  expect(response.statusCode).toEqual(404)
  expect(response.body).toEqual('Cannot GET /handler')
})

test('deberia invocar metodo que coincida con la ruta de metodo post', async () => {
  // Arrange
  const mockGetHandler = jest.fn(() => Promise.resolve({}))
  const mockPostHandler = jest.fn(() => Promise.resolve({}))
  const handler = router([
    {
      path: '/handler',
      method: 'GET',
      handler: mockGetHandler
    },
    {
      path: '/handler',
      method: 'POST',
      handler: mockPostHandler
    }
  ])

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'POST'
  })
  const context = mock<Context>()

  // Act
  await handler(event, context)

  // Assert
  expect(mockGetHandler).not.toHaveBeenCalled()
  expect(mockPostHandler).toHaveBeenCalled()
})

test('deberia retornar status http 500 si ocurre un error', async () => {
  // Arrange
  const mockHandler = jest.fn(() => Promise.reject(new Error()))
  const handler = router([
    {
      path: '/handler',
      method: 'GET',
      handler: mockHandler
    }
  ])

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  // Act
  const response = await handler(event, context)

  // Assert
  expect(mockHandler).toHaveBeenCalled()
  expect(response.statusCode).toEqual(500)
})

test('no deberia transformar la respuesta si esta ya es una cadena de texto', async () => {
  // Arrange
  const mockHandler = jest.fn(() => Promise.resolve({ body: 'test' }))
  const handler = router([
    {
      path: '/handler',
      method: 'GET',
      handler: mockHandler
    }
  ])

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  // Act
  const response = await handler(event, context)

  // Assert
  expect(mockHandler).toHaveBeenCalled()
  expect(response.body).toEqual('test')
})
