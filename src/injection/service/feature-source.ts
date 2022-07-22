import { asClass } from "awilix";
import { container } from "../../instance";
import { FeatureWebhook } from "../../../service/feature-webhook/FeatureWebhook";
import { FlagsmithFeatureWebhook } from "@/service/feature-webhook/flagsmith/FlagsmithFeatureWebhook";

container.register({
  featureSource: asClass<FeatureWebhook>(FlagsmithFeatureWebhook),
});
