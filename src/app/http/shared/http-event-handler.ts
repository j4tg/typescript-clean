import { APIGatewayEvent } from 'aws-lambda'
import { Logger } from '@/service/logger/Logger'
import { stringify } from '@/shared/stringify'
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
      let debug = JSON.parse(stringify(error))

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Unexpected error',
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
