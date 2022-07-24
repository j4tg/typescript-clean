import { APIGatewayEvent } from 'aws-lambda'
import { Logger } from '@/service/logger/Logger'
import { stringify } from '@/service/logger/stringify'
import { container } from '@/injection/container'

export const httpEventHandler = (handler: Handler) => {
  const logger = container.resolve<Logger>('Logger')

  return async (event: APIGatewayEvent) => {
    try {
      const response = await handler(event)
      return {
        statusCode: response.status ?? 200,
        body: secureBodyAsString(response.body)
      }
    } catch (error) {
      logger.debug('http event handler error', error)

      let message = 'Unknown error'
      let debug

      if (error instanceof Error) {
        message = error.message
        debug = JSON.parse(stringify(error))
      }

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: message,
          debug
        })
      }
    }
  }
}

function secureBodyAsString(body: unknown): string {
  return typeof body !== 'string' ? JSON.stringify(body) : body
}

type Handler = (event: APIGatewayEvent) => Promise<{
  status?: number
  body?: { [key: string]: unknown } | Array<unknown> | string
}>
