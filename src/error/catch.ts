import { z } from "zod";

export function tryCatch(friendyMessage?: string) {
  return function (target: any, propertyName: any, descriptor: any) {
    const method = descriptor.value;
    const handleError = makeHandleError(target, propertyName, friendyMessage);

    descriptor.value = function (...args: any) {
      try {
        const result = method.apply(this, args);

        if (isPromise(result)) {
          return result.catch(handleError);
        }

        return result;
      } catch (error) {
        handleError(error);
      }
    };
  };
}

function isPromise(object: any): object is Promise<any> {
  return !!object && typeof object.then === "function";
}

function makeHandleError(
  target: any,
  propertyName: any,
  friendyMessage?: string
) {
  const className = target?.constructor?.name;

  return function (error: any) {
    let reason = "Unexpected error";

    if (error instanceof z.ZodError) {
      reason = "Schema validation error";
    } else if (error instanceof Error) {
      reason = error.message;
    }

    throw new Error(
      `${className}#${propertyName}: ${friendyMessage ?? reason}`
    );
  };
}
