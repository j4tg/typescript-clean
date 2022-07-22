import { container } from "@/injection/container";
import { FeatureWebhook } from "@/service/feature-webhook/FeatureWebhook";
import { Logger } from "@/service/logger/Logger";
import { httpEventHandler } from "./shared/http-event-handler";

export const handler = httpEventHandler(async (event) => {
  const logger = container.resolve<Logger>("Logger");

  const feature = container
    .resolve<FeatureWebhook>("FeatureWebhook")
    .toFeature(JSON.parse(event.body || "{}"));

  logger.debug("feature", feature);

  return {
    body: {
      message: "Handler api",
    },
  };
});
