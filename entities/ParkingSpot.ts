import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { ParkingZone } from "./ParkingZone";
import { Payment } from "./Ticket";

@Entity("PARKINGSPOT")
export class ParkingSpot {
  @PrimaryGeneratedColumn("increment", { name: "SPOT_ID" })
  id!: number;

  @Column({ name: "STREET" })
  street!: string;

  @Column({ name: "ISOCCUPIED", type: "boolean" })
  isOccupied!: boolean;

  @ManyToOne(() => ParkingZone, (zone) => zone.spots)
  zone!: ParkingZone;

  @Column({ name: "ZONE_ID" })
  zoneId!: number;

  @OneToMany(() => Payment, (payment) => payment.spot)
  payments!: Payment[];
}
