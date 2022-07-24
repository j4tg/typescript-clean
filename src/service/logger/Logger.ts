export interface Logger {
  debug: (message: string, object?: { [key: string]: unknown }) => void
}
