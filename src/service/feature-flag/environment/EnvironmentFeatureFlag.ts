import { Logger } from "../../logger/Logger";
import { FeatureFlag } from "../FeatureFlag";

export class EnvironmentFeatureFlag implements FeatureFlag {
  constructor(private readonly logger: Logger) {}

  isEnabled(flagName: string): boolean {
    const isEnabled = !!process.env["FEATURE_" + flagName];

    this.logger.debug("environment feature flag", {
      flagName,
      isEnabled,
    });

    return isEnabled;
  }
}
