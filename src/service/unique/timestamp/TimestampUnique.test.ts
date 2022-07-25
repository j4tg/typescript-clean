import { container } from '@/injection/container'
import { TimestampUnique } from './TimestampUnique'
import { mock } from 'jest-mock-extended'
import { Logger } from '@/service/logger/Logger'

test('should generate id number stringified', () => {
  // Arrange
  const scope = container.createChildContainer()
  scope.registerInstance('Logger', mock<Logger>())

  // Act
  const id = scope.resolve(TimestampUnique).id()

  // Assert
  expect(id).toBeDefined()
})
