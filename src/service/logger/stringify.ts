import safeStringify from 'fast-safe-stringify'

function replacer (key: string, value: any) {
  if (value instanceof Error) {
    const error: { [key: string]: any } = {}
    Object.getOwnPropertyNames(value).forEach((propName) => {
      error[propName] = (value as any)[propName]
    })
    return error
  }
  return value
}

export function stringify (object?: { [key: string]: any }) {
  return safeStringify(object, replacer, 2)
}
