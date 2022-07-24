import { inject, injectable } from 'tsyringe'
import { Feature } from '@/model/Feature'
import { FeatureRepository } from '../repository/FeatureRepository'
import { Logger } from '@/service/logger/Logger'

@injectable()
export class GetAllFeatures {
  constructor(
    @inject('FeatureRepository') private readonly featureRepository: FeatureRepository,
    @inject('Logger') private readonly logger: Logger
  ) {
    this.logger.setName('UseCase:GetAllFeatures')
  }

  async execute(): Promise<Feature[]> {
    this.logger.debug('execute')
    return await this.featureRepository.getAll()
  }
}
