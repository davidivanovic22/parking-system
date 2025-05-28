import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ParkingSpot } from "./ParkingSpot";

@Entity("PARKINGZONE")
export class ParkingZone {
  @PrimaryGeneratedColumn("increment", { name: "ZONE_ID" })
  id!: number;

  @Column({ name: "NAME_ZONE" })
  name!: string;

  @Column({ name: "PRICE", type: "decimal" })
  price!: number;

  @OneToMany(() => ParkingSpot, (spot) => spot.zone)
  spots!: ParkingSpot[];
}
