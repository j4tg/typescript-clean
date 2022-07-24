import { TimestampIdentifier } from './TimestampIdentifier'

test('should generate id number stringified', () => {
  const identifier = new TimestampIdentifier()
  expect(identifier.unique()).toBeDefined()
})
