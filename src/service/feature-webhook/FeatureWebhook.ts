import { Feature } from "./Feature";

export interface FeatureWebhook {
  toFeature: (payload: { [key: string]: any }) => Feature;
  toFeatureAsync: (payload: { [key: string]: any }) => Promise<Feature>;
}
