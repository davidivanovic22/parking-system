import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ParkingSpot } from "./ParkingSpot";
import { Ticket } from "./Ticket";
import { RegistrationPlate } from "./RegistrationPlate";

@Entity("PAYMENT")
export class Payment {
  @PrimaryGeneratedColumn("increment", { name: "PAYMENT_ID" })
  id!: number;

  @ManyToOne(() => ParkingSpot, (spot) => spot.payments)
  spot!: ParkingSpot;

  @Column({ name: "SPOT_ID", nullable: true })
  spotId!: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.payments)
  ticket!: Ticket;

  @Column({ name: "TICKET_ID" })
  ticketId!: number;

  @ManyToOne(() => RegistrationPlate)
  plate!: RegistrationPlate;

  @Column({ name: "PLATE_NUMBER" })
  plateNumber!: string;

  @Column({ name: "AMOUNT", type: "decimal" })
  amount!: number;

  @Column({ name: "TRANSACTIONTIME", type: "date" })
  transactionTime!: Date;
}
