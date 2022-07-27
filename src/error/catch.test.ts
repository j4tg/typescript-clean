import { Catch } from './catch'

test('deberia envolver el error de una funcion sincrona', () => {
  // Arrange
  const target = { constructor: { name: 'TargetName' } }
  const propertyName = 'propertyName'
  const descriptor = {
    value: () => {
      throw new Error('test')
    }
  }

  // Act
  Catch()(target, propertyName, descriptor)

  // Assert
  expect(() => descriptor.value()).toThrow('TargetName#propertyName')
})

test('deberia guardarse el error original en el nuevo error', async () => {
  // Arrange
  const target = { constructor: { name: 'TargetName' } }
  const propertyName = 'propertyName'
  const descriptor = {
    value: () => Promise.reject(new Error('Unhandled error'))
  }

  // Act
  Catch()(target, propertyName, descriptor)

  // Assert
  await expect(() => descriptor.value()).rejects.toMatchObject({
    name: 'CatchError',
    message: 'TargetName#propertyName',
    innerError: {
      name: 'Error',
      message: 'Unhandled error',
      stack: expect.stringContaining('Error: Unhandled error')
    }
  })
})
