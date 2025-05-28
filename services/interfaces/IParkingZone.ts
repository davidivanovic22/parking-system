import { ParkingZone } from "../../entities/ParkingZone";

export interface IParkingZoneService {
  getAllZones(): Promise<Partial<ParkingZone>[]>;
  getZoneById(id: number): Promise<ParkingZone | null>;
  createZone(data: any): Promise<ParkingZone>;
  updateZone(id: number, data: any): Promise<ParkingZone | null>;
  deleteZone(id: number): Promise<any>;
}
