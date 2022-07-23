import { Feature } from '../model/Feature'

export interface FeatureRepository {
  create: (feature: Feature) => Promise<void>;
  update: (feature: Feature) => Promise<void>;
  deleteById: (featureId: string) => Promise<void>;
  getByName: (featureName: string) => Promise<Feature | undefined>;
  getAll: () => Promise<Feature[]>;
}
