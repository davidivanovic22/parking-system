import { ParkingSpotRepository } from "../repositories/ParkingSpotRepository";
import { IParkingSpotService } from "./interfaces/IParkingSpotService";
import { ParkingSpotBuilder } from "../builders/ParkingSpotBuilder";

export class ParkingSpotService implements IParkingSpotService {
  private repo = new ParkingSpotRepository();

  async getAllSpots() {
    return this.repo.findAll();
  }

  async getSpotById(id: number) {
    return this.repo.findById(id);
  }

  async createSpot(data: any) {
    const spot = new ParkingSpotBuilder()
      .setStreet(data.street)
      .setIsOccupied(data.isOccupied)
      .setZone(data.zone)
      .build();

    return this.repo.save(this.repo.create(spot));
  }

  async updateSpot(id: number, data: any) {
    const spot = await this.repo.findById(id);
    if (!spot) return null;

    const builder = new ParkingSpotBuilder()
      .fromExisting(spot)
      .setStreet(data.street)
      .setIsOccupied(data.isOccupied)
      .setZone(data.zone);
    const updatedSpot = Object.assign(spot, builder.build());

    return this.repo.save(updatedSpot);
  }

  async deleteSpot(id: number) {
    return this.repo.delete(id);
  }
}
