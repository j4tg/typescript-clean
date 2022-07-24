export interface FeatureRemote {
  parseWebhook: (webhook: unknown) => Feature
  testing: () => void
}

export interface Feature {
  name: string
  isEnabled: boolean
  isDeleted: boolean
}
