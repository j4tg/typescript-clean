import { inject, injectable } from 'tsyringe'
import { Feature } from '@/model/Feature'
import { FeatureRepository } from '../repository/FeatureRepository'
import { Logger } from '@/service/logger/Logger'

@injectable()
export class GetAllFeatures {
  constructor(
    @inject('FeatureRepository')
    private readonly featureRepository: FeatureRepository,
    @inject('Logger')
    private readonly logger: Logger
  ) {}

  async execute(): Promise<Feature[]> {
    this.logger.debug('get all features')
    return await this.featureRepository.getAll()
  }
}
