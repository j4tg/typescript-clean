export interface FeatureRemote {
  parseWebhook(webhook: unknown): Feature;
}

export interface Feature {
  name: string;
  isEnabled: boolean;
  isDeleted: boolean;
}
