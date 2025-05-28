import bcrypt from "bcrypt";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RegistrationPlate } from "./RegistrationPlate";
import { Role } from "./Role";

@Entity("USER")
export class User {
  @PrimaryGeneratedColumn("increment", { name: "USER_ID" })
  id!: number;

  @Column({ name: "NAME" })
  name!: string;

  @Column({ name: "EMAIL" })
  email!: string;

  @Column({ name: "USERNAME" })
  username!: string;

  @Column({ name: "PASSWORD" })
  password!: string;

  @OneToMany(() => RegistrationPlate, (plate) => plate.user)
  plates!: RegistrationPlate[];

  @ManyToMany(() => Role)
  @JoinTable({
    name: "USER_ROLE",
    joinColumn: { name: "USER_ID", referencedColumnName: "id" },
    inverseJoinColumn: { name: "ROLE_ID", referencedColumnName: "id" },
  })
  roles!: Role[];

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
}
