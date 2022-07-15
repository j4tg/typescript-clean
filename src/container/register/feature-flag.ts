import { asClass } from "awilix";
import { container } from "../instance";
import { FeatureFlag } from "../../services/feature-flag/FeatureFlag";
import { EnvironmentFeatureFlag } from "../../services/feature-flag/environment/EnvironmentFeatureFlag";

container.register({
  featureFlag: asClass<FeatureFlag>(EnvironmentFeatureFlag),
});
