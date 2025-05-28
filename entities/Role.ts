import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Column,
} from "typeorm";
import { User } from "./User";

@Entity("ROLE")
export class Role {
  @PrimaryGeneratedColumn("increment", { name: "ROLE_ID" })
  id!: number;

  @Column({ name: "NAME" })
  name!: string;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable()
  users!: User[];
}
