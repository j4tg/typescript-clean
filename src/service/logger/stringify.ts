import safeStringify from "fast-safe-stringify";

export function stringify(object?: { [key: string]: any }) {
  return safeStringify(object, replacer, 2);
}

function replacer(key: string, value: any) {
  if (value instanceof Error) {
    var error: { [key: string]: any } = {};
    Object.getOwnPropertyNames(value).forEach(function (propName) {
      error[propName] = (value as any)[propName];
    });
    return error;
  }
  return value;
}
