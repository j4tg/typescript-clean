import { inject, injectable } from 'tsyringe'
import { Logger } from '@/service/logger/Logger'
import { Feature } from '../model/Feature'
import { FeatureRepository } from '../repository/FeatureRepository'
import { FeatureRemote } from '../service/feature-remote/FeatureRemote'
import { Identifier } from '../service/identifier/Identifier'

@injectable()
export class FeatureSyncWithWebhook {
  constructor(
    @inject('FeatureRemote') private readonly featureRemote: FeatureRemote,
    @inject('FeatureRepository') private readonly featureRepository: FeatureRepository,
    @inject('Identifier') private readonly identifier: Identifier,
    @inject('Logger') private readonly logger: Logger
  ) {
    this.logger.setName('UseCase:FeatureSyncWithWebhook')
  }

  async execute(webhook: unknown): Promise<void> {
    this.logger.debug('execute')

    const featureWebhook = this.featureRemote.parseWebhook(webhook)
    const feature = await this.featureRepository.getByName(featureWebhook.name)

    if (featureWebhook.isDeleted) {
      this.logger.debug(`feature delete`)

      if (feature != null) {
        await this.featureRepository.deleteById(feature.id)
        return
      }
      return
    }

    if (feature != null) {
      this.logger.debug(`feature update`)
      feature.isEnabled = featureWebhook.isEnabled
      await this.featureRepository.update(feature)
      return
    }

    this.logger.debug(`feature create`)
    await this.featureRepository.create(
      new Feature(this.identifier.unique(), featureWebhook.name, featureWebhook.isEnabled)
    )
  }
}
