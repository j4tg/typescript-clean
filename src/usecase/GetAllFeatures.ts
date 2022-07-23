import { inject, injectable } from "tsyringe";
import { Feature } from "@/model/Feature";
import { FeatureRepository } from "../repository/FeatureRepository";

@injectable()
export class GetAllFeatures {
  constructor(
    @inject("FeatureRepository")
    private readonly featureRepository: FeatureRepository
  ) {}

  async execute(): Promise<Feature[]> {
    return await this.featureRepository.getAll();
  }
}
