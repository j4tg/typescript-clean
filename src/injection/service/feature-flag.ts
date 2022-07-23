import { container } from 'tsyringe'
import { FeatureFlag } from '@/service/feature-flag/FeatureFlag'
import { EnvironmentFeatureFlag } from '@/service/feature-flag/environment/EnvironmentFeatureFlag'

container.register<FeatureFlag>('FeatureFlag', EnvironmentFeatureFlag)
