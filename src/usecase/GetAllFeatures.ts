import { inject, injectable } from "tsyringe";
import { Feature } from "@/model/Feature";
import { FeatureRepository } from "../repository/FeatureRepository";

@injectable()
export class GetAllFeatures {
  constructor(
    @inject("FeatureRepository") private featureRepository: FeatureRepository
  ) {}

  async execute(): Promise<Feature[]> {
    return this.featureRepository.getAll();
  }
}
