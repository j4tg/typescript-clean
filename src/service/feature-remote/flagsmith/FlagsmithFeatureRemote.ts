import { tryCatch } from "@/error/catch";
import { injectable } from "tsyringe";
import { FeatureRemote, Feature } from "../FeatureRemote";
import { PayloadSchema } from "./PayloadSchema";

@injectable()
export class FlagsmithFeatureRemote implements FeatureRemote {
  @tryCatch()
  parseWebhook(webhook: unknown): Feature {
    const payload = PayloadSchema.parse(webhook);

    const name = payload.data.new_state.feature.name;
    const isEnabled = !!payload.data.new_state.enabled;

    return {
      name: name,
      isEnabled: isEnabled,
      isDeleted: false,
    };
  }
}
