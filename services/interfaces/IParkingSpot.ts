import { ParkingSpot } from "../../entities/ParkingSpot";

export interface IParkingSpotService {
  getAllSpots(): Promise<Partial<ParkingSpot>[]>;
  getSpotById(id: number): Promise<ParkingSpot | null>;
  createSpot(data: any): Promise<ParkingSpot>;
  updateSpot(id: number, data: any): Promise<ParkingSpot | null>;
  deleteSpot(id: number): Promise<any>;
}
