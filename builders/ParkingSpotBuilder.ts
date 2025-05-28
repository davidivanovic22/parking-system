import { ParkingSpot } from "../entities/ParkingSpot";
import { ParkingZone } from "../entities/ParkingZone";

export class ParkingSpotBuilder {
  private spot: Partial<ParkingSpot> = {};

  setId(id: number): this {
    this.spot.id = id;
    return this;
  }

  setStreet(street: string): this {
    this.spot.street = street;
    return this;
  }

  setIsOccupied(isOccupied: boolean): this {
    this.spot.isOccupied = isOccupied;
    return this;
  }

  setZone(zone: ParkingZone): this {
    this.spot.zone = zone;
    this.spot.zoneId = zone.id;
    return this;
  }

  fromExisting(spot: ParkingSpot): this {
    return this.setId(spot.id)
      .setStreet(spot.street)
      .setIsOccupied(spot.isOccupied)
      .setZone(spot.zone);
  }

  build(): Partial<ParkingSpot> {
    return this.spot;
  }
}
