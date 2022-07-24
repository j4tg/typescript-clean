export interface FeatureFlag {
  isEnabled: (flagName: string) => boolean
}
