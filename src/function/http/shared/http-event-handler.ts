import { APIGatewayEvent } from "aws-lambda";
import { Logger } from "@/service/logger/Logger";
import { container } from "@/injection/container";

interface Handler {
  (event: APIGatewayEvent): Promise<{
    statusCode?: number;
    body: { [key: string]: any };
  }>;
}

export const httpEventHandler = (handler: Handler) => {
  return async (event: APIGatewayEvent) => {
    try {
      const response = await handler(event);

      return {
        statusCode: 200,
        ...response,
        body: JSON.stringify(response.body),
      };
    } catch (error) {
      container.resolve<Logger>("logger").debug("httpEventHandler", { error });

      let message = error instanceof Error ? error.message : "Unexpected error";
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: message,
        }),
      };
    }
  };
};
