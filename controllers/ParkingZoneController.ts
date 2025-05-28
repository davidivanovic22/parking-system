import { Request, Response } from "express";
import { ParkingZoneService } from "../services/ParkingZoneService";

export class ParkingZoneController {
  private zoneService = new ParkingZoneService();

  async all(req: Request, res: Response) {
    const zones = await this.zoneService.getAllZones();
    res.json(zones);
  }

  async one(req: Request, res: Response) {
    const zone = await this.zoneService.getZoneById(+req.params.id);
    if (!zone) return res.status(404).send("Zone not found");
    res.json(zone);
  }

  async save(req: Request, res: Response) {
    const result = await this.zoneService.createZone(req.body);
    res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.zoneService.updateZone(+req.params.id, req.body);
    if (!result) return res.status(404).send("Zone not found");
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.zoneService.deleteZone(+req.params.id);
    res.json(result);
  }
}
