// src/config/Database.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { RegistrationPlate } from "../entities/RegistrationPlate";
import { ParkingZone } from "../entities/ParkingZone";
import { ParkingSpot } from "../entities/ParkingSpot";
import { Ticket } from "../entities/Ticket";
import { Payment } from "../entities/Payment";

config();

export class Database {
  private static instance: DataSource | null = null;

  private constructor() {}

  public static getInstance(): DataSource {
    if (!Database.instance) {
      Database.instance = new DataSource({
        type: "mysql",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || "3306", 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        synchronize: false,
        logging: false,
        entities: [
          User,
          Role,
          RegistrationPlate,
          ParkingZone,
          ParkingSpot,
          Ticket,
          Payment,
        ],
      });
    }
    return Database.instance;
  }

  public static async initialize(): Promise<DataSource> {
    const dataSource = Database.getInstance();
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log("DataSource initialized.");
    }
    return dataSource;
  }
}
