import { RegistrationPlateRepository } from "../repositories/RegistrationPlateRepository";
import { IRegistrationPlateService } from "./interfaces/IRegistrationPlateService";

export class RegistrationPlateService implements IRegistrationPlateService {
  private repo = new RegistrationPlateRepository();

  async getAllPlates() {
    return this.repo.findAll();
  }

  async getPlateByNumber(plateNumber: string) {
    return this.repo.findByNumber(plateNumber);
  }

  async createPlate(data: any) {
    const plate = this.repo.create(data);
    return this.repo.save(plate);
  }

  async updatePlate(plateNumber: string, data: any) {
    const plate = await this.repo.findByNumber(plateNumber);
    if (!plate) return null;
    Object.assign(plate, data);
    return this.repo.save(plate);
  }

  async deletePlate(plateNumber: string) {
    return this.repo.delete(plateNumber);
  }
}
