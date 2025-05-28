import { Request, Response } from "express";
import { ParkingSpotService } from "../services/ParkingSpotService";

export class ParkingSpotController {
  private parkingSpotService = new ParkingSpotService();

  async all(req: Request, res: Response) {
    const spots = await this.parkingSpotService.getAllSpots();
    res.json(spots);
  }

  async one(req: Request, res: Response) {
    const spot = await this.parkingSpotService.getSpotById(+req.params.id);
    if (!spot) return res.status(404).send("Spot not found");
    res.json(spot);
  }

  async save(req: Request, res: Response) {
    const result = await this.parkingSpotService.createSpot(req.body);
    res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.parkingSpotService.updateSpot(
      +req.params.id,
      req.body
    );
    if (!result) return res.status(404).send("Spot not found");
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.parkingSpotService.deleteSpot(+req.params.id);
    res.json(result);
  }
}
