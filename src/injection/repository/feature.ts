import { container } from 'tsyringe'
import { FeatureRepository } from '@/repository/FeatureRepository'
import { InMemoryFeatureRepository } from '@/repository/inmemory/InMemoryFeatureRepository'

container.register<FeatureRepository>(
  'FeatureRepository',
  InMemoryFeatureRepository
)
