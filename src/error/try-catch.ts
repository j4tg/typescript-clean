import { stringify } from '@/shared/stringify'

export function tryCatch() {
  return (target: unknown, propertyName: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value
    const handleError = buildHandleError(buildTargetName(target, propertyName))

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

function buildHandleError(target: string) {
  return (args: unknown[]) => {
    return function (error: unknown) {
      if (error instanceof Error) {
        error.stack = `Catch ${target}: ${stringify(args)}\n${error.stack}`
      }
      throw error
    }
  }
}

function buildTargetName(target: unknown, propertyName: string) {
  return (target as Record<string, unknown>).constructor.name + '.' + propertyName
}

function isPromise(object: unknown): object is Promise<unknown> {
  return !!object && (object as Promise<unknown>).then != null
}
