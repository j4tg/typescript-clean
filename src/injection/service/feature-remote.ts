import { container } from 'tsyringe'
import { FeatureRemote } from '@/service/feature-remote/FeatureRemote'
import { FlagsmithFeatureRemote } from '@/service/feature-remote/flagsmith/FlagsmithFeatureRemote'

switch (process.env.SERVICE__FEATURE_REMOTE) {
  case 'flagsmith':
    container.register<FeatureRemote>('FeatureRemote', FlagsmithFeatureRemote)
    break
}
