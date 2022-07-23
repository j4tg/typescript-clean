import { Feature } from "@/model/Feature";
import { FeatureRepository } from "../FeatureRepository";

export class InMemoryFeatureRepository implements FeatureRepository {
  private static features: Feature[] = [];

  async create(feature: Feature): Promise<void> {
    InMemoryFeatureRepository.features.push(feature);
  }

  async update(feature: Feature): Promise<void> {
    InMemoryFeatureRepository.features = InMemoryFeatureRepository.features.map(
      (item) => {
        if (item.id === feature.id) {
          item.isEnabled = feature.isEnabled;
          return item;
        }
        return item;
      }
    );
  }

  async deleteById(featureId: string): Promise<void> {
    InMemoryFeatureRepository.features =
      InMemoryFeatureRepository.features.filter(
        (item) => item.id !== featureId
      );
  }

  async getByName(featureName: string): Promise<Feature | undefined> {
    return InMemoryFeatureRepository.features.find(
      (item) => item.name === featureName
    );
  }
}
