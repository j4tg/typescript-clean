import { FeatureFlag } from "../FeatureFlag";

export class EnvironmentFeatureFlag implements FeatureFlag {
  isEnabled(flag: string): boolean {
    return !!process.env["FEATURE_" + flag];
  }
}
