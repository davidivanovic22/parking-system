import { Repository } from "typeorm";
import { Database } from "../config/Database";
import { RegistrationPlate } from "../entities/RegistrationPlate";

export class RegistrationPlateRepository {
  private repo: Repository<RegistrationPlate>;

  constructor() {
    this.repo = Database.getInstance().getRepository(RegistrationPlate);
  }

  findAll() {
    return this.repo.find({ relations: ["user"] });
  }

  findByNumber(plateNumber: string) {
    return this.repo.findOne({ where: { plateNumber }, relations: ["user"] });
  }

  create(data: Partial<RegistrationPlate>) {
    return this.repo.create(data);
  }

  save(plate: RegistrationPlate) {
    return this.repo.save(plate);
  }

  delete(plateNumber: string) {
    return this.repo.delete(plateNumber);
  }
}
