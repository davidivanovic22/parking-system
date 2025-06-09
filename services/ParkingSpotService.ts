import { ParkingSpotRepository } from "../repositories/ParkingSpotRepository";
import { IParkingSpotService } from "./interfaces/IParkingSpotService";
import { ParkingSpotBuilder } from "../builders/ParkingSpotBuilder";
import { ParkingSpot } from "../entities/ParkingSpot";
import { HttpException } from "../exceptions/HttpExceptions";

export class ParkingSpotService implements IParkingSpotService {
  private repo = new ParkingSpotRepository();

  async getAllSpots() {
    return this.repo.findAll();
  }

  async getSpotById(id: number) {
    const spot = await this.repo.findById(id);
    if (!spot) throw new HttpException(404, "Parking spot not found");
    return spot;
  }

  async createSpot(data: ParkingSpot) {
    if (!data.street || !data.zone) {
      throw new HttpException(400, "Street and zone are required");
    }

    try {
      const spot = new ParkingSpotBuilder()
        .setStreet(data.street)
        .setIsOccupied(data.isOccupied)
        .setZone(data.zone)
        .build();

      return await this.repo.save(this.repo.create(spot));
    } catch (err) {
      throw new HttpException(500, "Failed to create parking spot");
    }
  }

  async updateSpot(id: number, data: ParkingSpot) {
    if (!id || typeof id !== "number") {
      throw new HttpException(400, "Invalid ID");
    }

    const spot = await this.repo.findById(id);
    if (!spot) throw new HttpException(404, "Parking spot not found");

    try {
      const builder = new ParkingSpotBuilder()
        .fromExisting(spot)
        .setStreet(data.street)
        .setIsOccupied(data.isOccupied)
        .setZone(data.zone);

      const updatedSpot = Object.assign(spot, builder.build());
      return await this.repo.save(updatedSpot);
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(500, "Failed to updated spot: " + err.message);
      } else {
        throw new HttpException(500, "An unexpected error occurred");
      }
    }
  }

  async deleteSpot(id: number) {
    const spot = await this.repo.findById(id);
    if (!spot) throw new HttpException(404, "Parking spot not found");

    try {
      return await this.repo.delete(id);
    } catch {
      throw new HttpException(500, "Failed to delete parking spot");
    }
  }
}
