export interface Logger {
  setName(name: string): this
  debug: (message: string, ...details: unknown[]) => void
}
