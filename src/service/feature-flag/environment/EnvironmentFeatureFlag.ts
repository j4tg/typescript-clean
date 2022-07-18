import { Logger } from "../../logger/Logger";
import { FeatureFlag } from "../FeatureFlag";

export class EnvironmentFeatureFlag implements FeatureFlag {
  constructor(private logger: Logger) {}

  isEnabled(flag: string): boolean {
    const isEnabled = !!process.env["FEATURE_" + flag];

    this.logger.debug("environment feature flag", {
      flag,
      isEnabled,
    });

    return isEnabled;
  }
}
