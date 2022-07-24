import { UnexpectedError } from './UnexpectedError'

export function tryCatch(friendyMessage?: string) {
  return function (target: unknown, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value
    const handleError = makeHandleError(target, propertyName, friendyMessage)

    descriptor.value = function (...args: unknown[]) {
      try {
        const result = method?.apply(this, args)
        if (isPromise(result)) {
          return result.catch(handleError)
        }

        return result
      } catch (error) {
        handleError(error)
      }
    }
  }
}

function makeHandleError(target: unknown, propertyName: string, friendyMessage?: string) {
  const className = (target as Record<string, unknown>)?.constructor?.name

  return function (error: unknown) {
    const reason = 'Unexpected error'

    throw new UnexpectedError(`${className}#${propertyName}: ${friendyMessage ?? reason}`, error)
  }
}

function isPromise(object: unknown): object is Promise<unknown> {
  return !!object && (object as Promise<unknown>).then != null
}
