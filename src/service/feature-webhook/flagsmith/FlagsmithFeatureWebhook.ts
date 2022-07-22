import { injectable } from "tsyringe";
import { Feature } from "../Feature";
import { FeatureWebhook } from "../FeatureWebhook";

@injectable()
export class FlagsmithFeatureWebhook implements FeatureWebhook {
  toFeature(data: { [k: string]: any }): Feature {
    const name = data.data.new_state.feature.name;
    const isEnabled = !!data.data.new_state.enabled;

    return {
      name: name,
      isEnabled: isEnabled,
    };
  }
}
