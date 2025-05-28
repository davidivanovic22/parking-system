import { ParkingZoneRepository } from "../repositories/ParkingZoneRepository";
import { IParkingZoneService } from "./interfaces/IParkingZoneService";

export class ParkingZoneService implements IParkingZoneService {
  private repo = new ParkingZoneRepository();

  async getAllZones() {
    return this.repo.findAll();
  }

  async getZoneById(id: number) {
    return this.repo.findById(id);
  }

  async createZone(data: any) {
    const zone = this.repo.create(data);
    return this.repo.save(zone);
  }

  async updateZone(id: number, data: any) {
    const zone = await this.repo.findById(id);
    if (!zone) return null;
    Object.assign(zone, data);
    return this.repo.save(zone);
  }

  async deleteZone(id: number) {
    return this.repo.delete(id);
  }
}
