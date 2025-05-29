import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
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
  @JoinColumn({ name: "ZONE_ID" }) // here is the FK column name in DB
  zone!: ParkingZone;

  @OneToMany(() => Payment, (payment) => payment.spot)
  payments!: Payment[];
}
