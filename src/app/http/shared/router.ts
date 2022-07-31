import { ValidationError } from '@/error/ValidationError'
import { stringify } from '@/shared/stringify'
import { APIGatewayEvent, Context } from 'aws-lambda'
import UrlPattern from 'url-pattern'

export function router(routes: Route[]) {
  return async (event: APIGatewayEvent, context: Context) => {
    for (const route of routes) {
      if (route.method !== event.httpMethod) {
        continue
      }

      const match = new UrlPattern(route.path).match(event.path)
      if (!match) {
        continue
      }

      const { statusCode, body } = await wrapper(() =>
        route.handler({ event, context, params: match })
      )

      return {
        statusCode: statusCode ?? 200,
        body: safeBody(body)
      }
    }

    return {
      statusCode: 404,
      body: `Cannot ${event.httpMethod} ${event.path}`
    }
  }
}

async function wrapper(handler: () => ReturnType<Route['handler']>) {
  try {
    return await handler()
  } catch (error) {
    const debug = JSON.parse(stringify(error))
    const { status, name, message } = parseError(error)

    return {
      statusCode: status,
      body: {
        error: name,
        message: message,
        timestamp: new Date().toISOString(),
        debug: debug
      }
    }
  }
}

function safeBody(body: unknown): string {
  return typeof body !== 'string' ? JSON.stringify(body) : body
}

function parseError(error: unknown) {
  let status = 500
  let name = 'Internal Server Error'

  if (error instanceof ValidationError) {
    status = 400
    name = 'Bad Request'
  }

  return { status, name, message: (error as Error).message }
}

interface Route {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  handler: {
    ({
      event,
      context,
      params
    }: {
      event: APIGatewayEvent
      context: Context
      params: Record<string, unknown>
    }): Promise<{
      statusCode?: number
      body?: { [key: string]: unknown } | Array<unknown> | string
    }>
  }
}
