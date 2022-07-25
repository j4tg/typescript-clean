import { container } from '@/injection/container'
import { TimestampIdentifier } from './TimestampIdentifier'
import { mock } from 'jest-mock-extended'
import { Logger } from '@/service/logger/Logger'

test('should generate id number stringified', () => {
  // Arrange
  const scope = container.createChildContainer()
  scope.registerInstance('Logger', mock<Logger>())

  // Act
  const identifier = scope.resolve(TimestampIdentifier).unique()

  // Assert
  expect(identifier).toBeDefined()
})
