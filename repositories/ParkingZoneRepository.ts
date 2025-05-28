import { Repository } from "typeorm";
import { Database } from "../config/Database";
import { ParkingZone } from "../entities/ParkingZone";

export class ParkingZoneRepository {
  private repo: Repository<ParkingZone>;

  constructor() {
    this.repo = Database.getInstance().getRepository(ParkingZone);
  }

  findAll() {
    return this.repo.find({ relations: ["spots"] });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id }, relations: ["spots"] });
  }

  create(data: Partial<ParkingZone>) {
    return this.repo.create(data);
  }

  save(zone: ParkingZone) {
    return this.repo.save(zone);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
