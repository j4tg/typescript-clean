import { Feature } from "./Feature";

export interface FeatureWebhook {
  toFeature: (data: { [key: string]: any }) => Feature;
}
