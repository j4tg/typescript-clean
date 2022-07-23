import { inject, injectable } from "tsyringe";
import { tryCatch } from "@/error/try-catch";
import { Logger } from "@/service/logger/Logger";
import { FeatureRemote, Feature } from "../FeatureRemote";
import { PayloadSchema } from "./PayloadSchema";

@injectable()
export class FlagsmithFeatureRemote implements FeatureRemote {
  constructor(@inject("Logger") private readonly logger: Logger) {}

  @tryCatch()
  parseWebhook(webhook: unknown): Feature {
    this.logger.debug("flagsmith webhook", { webhook });

    const payload = PayloadSchema.parse(webhook);

    if (payload.event_type === "FLAG_DELETED") {
      if (payload.data.previous_state == null) {
        throw new Error("previous_state is required");
      }

      const name = payload.data.previous_state.feature.name;
      return {
        name: name,
        isEnabled: false,
        isDeleted: true,
      };
    }

    if (payload.data.new_state == null) {
      throw new Error("new_state is required");
    }

    const name = payload.data.new_state.feature.name;
    const isEnabled = !!payload.data.new_state.enabled;

    return {
      name: name,
      isEnabled: isEnabled,
      isDeleted: false,
    };
  }
}
