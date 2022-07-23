import { container } from 'tsyringe'
import { FeatureRemote } from '@/service/feature-remote/FeatureRemote'
import { FlagsmithFeatureRemote } from '@/service/feature-remote/flagsmith/FlagsmithFeatureRemote'

container.register<FeatureRemote>('FeatureRemote', FlagsmithFeatureRemote)
