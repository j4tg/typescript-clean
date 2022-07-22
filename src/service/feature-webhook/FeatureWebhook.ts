import { Feature } from "./Feature";

export interface FeatureWebhook {
  toFeature: (payload: { [key: string]: any }) => Feature;
}
