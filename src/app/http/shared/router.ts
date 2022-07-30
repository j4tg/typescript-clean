import { stringify } from '@/shared/stringify'
import { APIGatewayEvent, Context } from 'aws-lambda'
import UrlPattern from 'url-pattern'

export function router(routes: Route[]) {
  return async (event: APIGatewayEvent, context: Context) => {
    for (const route of routes) {
      if (route.method !== event.httpMethod) {
        continue
      }

      const params = new UrlPattern(route.path).match(event.path)
      if (!params) {
        continue
      }

      return await handler(async () =>
        route.handler({ event, context, params })
      )
    }

    return {
      statusCode: 404,
      body: `Cannot ${event.httpMethod} ${event.path}`
    }
  }
}

async function handler(wrapped: () => ReturnType<Route['handler']>) {
  try {
    const response = await wrapped()

    return {
      statusCode: response.statusCode ?? 200,
      body:
        typeof response.body !== 'string'
          ? JSON.stringify(response.body)
          : response.body
    }
  } catch (error) {
    const debug = JSON.parse(stringify(error))

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Unhandled error',
        debug
      })
    }
  }
}

interface Route {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  handler: ({
    event,
    context,
    params
  }: {
    event: APIGatewayEvent
    context: Context
    params: Record<string, unknown>
  }) => Promise<{
    statusCode?: number
    body?: { [key: string]: unknown } | Array<unknown> | string
  }>
}
