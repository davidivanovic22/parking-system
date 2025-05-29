import { ParkingSpot } from "../../entities/ParkingSpot";

export interface IParkingSpotService {
  getAllSpots(): Promise<Partial<ParkingSpot>[]>;
  getSpotById(id: number): Promise<ParkingSpot | null>;
  createSpot(data: ParkingSpot): Promise<ParkingSpot>;
  updateSpot(id: number, data: ParkingSpot): Promise<ParkingSpot | null>;
  deleteSpot(id: number): Promise<any>;
}
