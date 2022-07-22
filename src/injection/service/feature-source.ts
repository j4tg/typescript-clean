import { container } from "tsyringe";
import { FeatureWebhook } from "@/service/feature-webhook/FeatureWebhook";
import { FlagsmithFeatureWebhook } from "@/service/feature-webhook/flagsmith/FlagsmithFeatureWebhook";

container.register<FeatureWebhook>("FeatureWebhook", FlagsmithFeatureWebhook);
