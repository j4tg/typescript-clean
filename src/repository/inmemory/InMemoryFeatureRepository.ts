import { Feature } from '@/model/Feature'
import { Logger } from '@/service/logger/Logger'
import { inject, injectable } from 'tsyringe'
import { FeatureRepository } from '../FeatureRepository'

@injectable()
export class InMemoryFeatureRepository implements FeatureRepository {
  private static features: Feature[] = []

  constructor(@inject('Logger') private logger: Logger) {}

  async create(feature: Feature): Promise<void> {
    this.logger.debug('in memory feature repository create')
    InMemoryFeatureRepository.features.push(feature)
  }

  async update(feature: Feature): Promise<void> {
    InMemoryFeatureRepository.features = InMemoryFeatureRepository.features.map(
      (item) => {
        if (item.id === feature.id) {
          item.isEnabled = feature.isEnabled
          return item
        }
        return item
      }
    )
  }

  async deleteById(featureId: string): Promise<void> {
    InMemoryFeatureRepository.features =
      InMemoryFeatureRepository.features.filter((item) => item.id !== featureId)
  }

  async getByName(featureName: string): Promise<Feature | undefined> {
    return InMemoryFeatureRepository.features.find(
      (item) => item.name === featureName
    )
  }

  async getAll(): Promise<Feature[]> {
    this.logger.debug('in memory feature repository get all')
    return InMemoryFeatureRepository.features
  }
}
