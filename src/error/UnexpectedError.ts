/**
 * The name could be UnhandlerError too
 */

export class UnexpectedError extends Error {
  /**
   * The name of the property with error.
   */
  target?: string

  /**
   * The args of the property with error.
   */
  args?: unknown[]

  /**
   * Additional error object that may be more specific than the top level error.
   */
  innerError?: Error

  constructor(message?: string, innerError?: Error, target?: string, args?: unknown[]) {
    super(message)
    this.target = target
    this.args = args
    this.innerError = innerError
  }
}
