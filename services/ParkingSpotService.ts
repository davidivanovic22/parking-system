import { ParkingSpotRepository } from "../repositories/ParkingSportRepository";
import { IParkingSpotService } from "./interfaces/IParkingSpot";

export class ParkingSpotService implements IParkingSpotService {
  private repo = new ParkingSpotRepository();

  async getAllSpots() {
    return this.repo.findAll();
  }

  async getSpotById(id: number) {
    return this.repo.findById(id);
  }

  async createSpot(data: any) {
    const spot = this.repo.create(data);
    return this.repo.save(spot);
  }

  async updateSpot(id: number, data: any) {
    const spot = await this.repo.findById(id);
    if (!spot) return null;
    Object.assign(spot, data);
    return this.repo.save(spot);
  }

  async deleteSpot(id: number) {
    return this.repo.delete(id);
  }
}
