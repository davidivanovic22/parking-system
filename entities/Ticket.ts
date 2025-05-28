import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Payment } from "./Payment";

@Entity("TICKET")
export class Ticket {
  @PrimaryGeneratedColumn("increment", { name: "TICKET_ID" })
  id!: number;

  @Column({ name: "PRICE", type: "decimal" })
  price!: number;

  @Column({ name: "STARTTIME", type: "datetime" })
  startTime!: Date;

  @Column({ name: "ENDTIME", type: "datetime" })
  endTime!: Date;

  @Column({ name: "ISACTIVE", type: "boolean" })
  isActive!: boolean;

  @OneToMany(() => Payment, (payment) => payment.ticket)
  payments!: Payment[];
}
export { Payment };
