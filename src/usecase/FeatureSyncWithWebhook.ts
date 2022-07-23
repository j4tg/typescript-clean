import { injectable } from "tsyringe";
import { Feature } from "../model/Feature";
import { FeatureRepository } from "../repository/FeatureRepository";
import { FeatureRemote } from "../service/feature-remote/FeatureRemote";
import { Identifier } from "../service/identifier/Identifier";

@injectable()
export class FeatureSyncWithWebhook {
  constructor(
    private featureRemote: FeatureRemote,
    private featureRepository: FeatureRepository,
    private identifier: Identifier
  ) {}

  async execute(webhook: unknown): Promise<void> {
    const featureWebhook = this.featureRemote.parseWebhook(webhook);
    const feature = await this.featureRepository.getByName(featureWebhook.name);

    if (featureWebhook.isDeleted) {
      if (feature != null) {
        await this.featureRepository.deleteById(feature.id);
        return;
      }
      return;
    }

    if (feature != null) {
      feature.isEnabled = featureWebhook.isEnabled;
      await this.featureRepository.update(feature);
      return;
    }

    await this.featureRepository.create(
      new Feature(
        this.identifier.unique(),
        featureWebhook.name,
        featureWebhook.isEnabled
      )
    );
  }
}
