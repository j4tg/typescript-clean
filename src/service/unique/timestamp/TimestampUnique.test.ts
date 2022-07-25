import { TimestampUnique } from './TimestampUnique'
import { mock } from 'jest-mock-extended'
import { Logger } from '@/service/logger/Logger'

test('should generate id number stringified', () => {
  // Arrange
  const timestampUnique = new TimestampUnique(mock<Logger>())

  // Act
  const id = timestampUnique.id()

  // Assert
  expect(id).toBeDefined()
})
