import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("REGISTRATION_PLATE")
export class RegistrationPlate {
  @PrimaryColumn({ name: "PLATE_NUMBER" })
  plateNumber!: string;

  @Column({ name: "USER_ID" })
  userId!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "USER_ID" })
  user!: User;
}
