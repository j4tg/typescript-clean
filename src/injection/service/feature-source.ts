import { container } from 'tsyringe'
import { FeatureSource } from '@/service/feature-source/FeatureSource'
import { FlagsmithFeatureSource } from '@/service/feature-source/flagsmith/FlagsmithFeatureSource'

switch (process.env.SERVICE__FEATURE_SOURCE) {
  case 'flagsmith':
    container.register<FeatureSource>('FeatureSource', FlagsmithFeatureSource)
    break
}
