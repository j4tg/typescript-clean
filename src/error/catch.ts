import { stringify } from '@/shared/stringify'

export function Catch() {
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
        handleError(args)(error as Error)
      }
    }
  }
}

function buildHandleError(targetName: string) {
  return (args: unknown[]) => {
    return function (error: Error) {
      throw new CatchError(targetName, {
        target: targetName,
        args: args.map(stringify),
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    }
  }
}

function buildTargetName(target: unknown, propertyName: string) {
  return (target as Record<string, unknown>).constructor.name + '#' + propertyName
}

function isPromise(object: unknown): object is Promise<unknown> {
  return !!object && (object as Promise<unknown>).then != null
}

class CatchError extends Error {
  innerError: {
    name: string
    message: string
    target: string
    args: unknown[]
    stack?: string
  }

  constructor(message: string, innerError: CatchError['innerError']) {
    super(message)

    this.name = 'CatchError'
    this.innerError = innerError

    if (innerError?.stack) {
      this.stack = innerError.stack + '\n' + this.stack
    }
  }
}
