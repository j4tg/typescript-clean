/**
 * the name could be UnhandlerError too
 */
export class UnexpectedError extends Error {
  innerError?: unknown

  constructor (message: string, innerError?: unknown) {
    super(message)
    this.name = 'UnexpectedError'
    this.innerError = innerError
  }
}
