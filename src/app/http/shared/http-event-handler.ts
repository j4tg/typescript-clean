import { APIGatewayEvent } from "aws-lambda";
import { Logger } from "@/service/logger/Logger";
import { stringify } from "@/service/logger/stringify";
import { container } from "@/injection/container";

export const httpEventHandler = (handler: Handler) => {
  const logger = container.resolve<Logger>("Logger");

  return async (event: APIGatewayEvent) => {
    try {
      const response = await handler(event);
      return {
        statusCode: response.status ?? 200,
        body: JSON.stringify(response.body),
      };
    } catch (error) {
      logger.debug("httpEventHandler error", { error });

      let message = "Unknown error";
      let debug;

      if (error instanceof Error) {
        message = error.message;
        debug = JSON.parse(stringify(error));
      }

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: message,
          debug,
        }),
      };
    }
  };
};

type Handler = (event: APIGatewayEvent) => Promise<{
  status?: number;
  body?: { [key: string]: any };
}>;
