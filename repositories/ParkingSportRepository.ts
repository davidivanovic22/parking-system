import { Repository } from "typeorm";
import { Database } from "../config/Database";
import { ParkingSpot } from "../entities/ParkingSpot";

export class ParkingSpotRepository {
  private repo: Repository<ParkingSpot>;

  constructor() {
    this.repo = Database.getInstance().getRepository(ParkingSpot);
  }

  findAll() {
    return this.repo.find({ relations: ["zone"] });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id }, relations: ["zone"] });
  }

  create(data: Partial<ParkingSpot>) {
    return this.repo.create(data);
  }

  save(spot: ParkingSpot) {
    return this.repo.save(spot);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
