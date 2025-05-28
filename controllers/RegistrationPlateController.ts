import { Request, Response } from "express";
import { RegistrationPlateService } from "../services/RegistrationPlateService";

export class RegistrationPlateController {
  private plateService = new RegistrationPlateService();

  async all(req: Request, res: Response) {
    const plates = await this.plateService.getAllPlates();
    res.json(plates);
  }

  async one(req: Request, res: Response) {
    const plate = await this.plateService.getPlateByNumber(req.params.id);
    if (!plate) return res.status(404).send("Plate not found");
    res.json(plate);
  }

  async save(req: Request, res: Response) {
    const result = await this.plateService.createPlate(req.body);
    res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.plateService.updatePlate(req.params.id, req.body);
    if (!result) return res.status(404).send("Plate not found");
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.plateService.deletePlate(req.params.id);
    res.json(result);
  }
}
