import { UnexpectedError } from './UnexpectedError'

export function tryCatch(message?: string) {
  return function (target: unknown, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value
    const handleError = buildHandleError(buildTargetName(target, propertyName), message)

    descriptor.value = function (...args: unknown[]) {
      try {
        const result = method.apply(this, args)
        if (isPromise(result)) {
          return result.catch(handleError(args))
        }

        return result
      } catch (error) {
        handleError(args)(error)
      }
    }
  }
}

function buildHandleError(target: string, message = 'Unexpected error') {
  return function (args: unknown[]) {
    return function (innerError: unknown) {
      throw new UnexpectedError(message, innerError as Error, target, args)
    }
  }
}

function buildTargetName(target: unknown, propertyName: string) {
  return (target as Record<string, unknown>).constructor.name + '#' + propertyName
}

function isPromise(object: unknown): object is Promise<unknown> {
  return !!object && (object as Promise<unknown>).then != null
}
