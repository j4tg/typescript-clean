import { container } from "@/injection/container";
import { FeatureRemote } from "@/service/feature-remote/FeatureRemote";
import { Logger } from "@/service/logger/Logger";
import { httpEventHandler } from "./shared/http-event-handler";

export const handler = httpEventHandler(async (event) => {
  const logger = container.resolve<Logger>("Logger");

  const feature = container
    .resolve<FeatureRemote>("FeatureRemote")
    .parseWebhook(JSON.parse(event.body || "{}"));

  logger.debug("feature", feature);

  return {
    body: {
      message: "Handler api",
    },
  };
});
