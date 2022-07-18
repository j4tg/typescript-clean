export interface Logger {
  debug: (message: string, object?: { [key: string]: any }) => void;
}
