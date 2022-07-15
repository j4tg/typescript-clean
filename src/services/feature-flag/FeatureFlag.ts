import { FeatureName } from "../../config/feature";

export interface FeatureFlag {
  isEnabled: (flag: FeatureName) => boolean;
}
