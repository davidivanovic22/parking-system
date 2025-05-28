import { RegistrationPlate } from "../../entities/RegistrationPlate";

export interface IRegistrationPlateService {
  getAllPlates(): Promise<Partial<RegistrationPlate>[]>;
  getPlateByNumber(plateNumber: string): Promise<RegistrationPlate | null>;
  createPlate(data: RegistrationPlate): Promise<RegistrationPlate>;
  updatePlate(
    plateNumber: string,
    data: RegistrationPlate
  ): Promise<RegistrationPlate | null>;
  deletePlate(plateNumber: string): Promise<any>;
}
