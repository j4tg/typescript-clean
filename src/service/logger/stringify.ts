import safeStringify from 'fast-safe-stringify'

export function stringify(object?: unknown) {
  return safeStringify(object, replacer, 4)
}

function replacer(key: string, value: unknown) {
  if (value instanceof Error) {
    const error: Record<string, unknown> = {}
    Object.getOwnPropertyNames(value).forEach((propName) => {
      error[propName] = (value as unknown as Record<string, unknown>)[propName]
    })
    return error
  }
  return value
}
