import { asClass } from "awilix";
import { container } from "../instance";
import { FeatureFlag } from "../../service/feature-flag/FeatureFlag";
import { EnvironmentFeatureFlag } from "../../service/feature-flag/environment/EnvironmentFeatureFlag";

container.register({
  featureFlag: asClass<FeatureFlag>(EnvironmentFeatureFlag),
});
