import { Logger } from "@/service/logger/Logger";
import { inject, injectable } from "tsyringe";
import { Feature } from "../model/Feature";
import { FeatureRepository } from "../repository/FeatureRepository";
import { FeatureRemote } from "../service/feature-remote/FeatureRemote";
import { Identifier } from "../service/identifier/Identifier";

@injectable()
export class FeatureSyncWithWebhook {
  constructor(
    @inject("FeatureRemote") private readonly featureRemote: FeatureRemote,
    @inject("FeatureRepository")
    private readonly featureRepository: FeatureRepository,
    @inject("Identifier") private readonly identifier: Identifier,
    @inject("Logger") private readonly logger: Logger
  ) {}

  async execute(webhook: unknown): Promise<void> {
    const featureWebhook = this.featureRemote.parseWebhook(webhook);
    const feature = await this.featureRepository.getByName(featureWebhook.name);

    if (featureWebhook.isDeleted) {
      if (feature != null) {
        await this.featureRepository.deleteById(feature.id);
        this.logger.debug(`Feature ${feature.name} deleted`);
        return;
      }
      return;
    }

    if (feature != null) {
      feature.isEnabled = featureWebhook.isEnabled;
      await this.featureRepository.update(feature);
      this.logger.debug(`Feature ${feature.name} updated`);
      return;
    }

    await this.featureRepository.create(
      new Feature(
        this.identifier.unique(),
        featureWebhook.name,
        featureWebhook.isEnabled
      )
    );

    this.logger.debug(`Feature ${featureWebhook.name} created`);
  }
}
