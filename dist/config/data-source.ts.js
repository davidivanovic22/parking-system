"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const User_1 = require("../entities/User");
const Role_1 = require("../entities/Role");
const RegistrationPlate_1 = require("../entities/RegistrationPlate");
const ParkingZone_1 = require("../entities/ParkingZone");
const ParkingSpot_1 = require("../entities/ParkingSpot");
const Ticket_1 = require("../entities/Ticket");
const Payment_1 = require("../entities/Payment");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306", 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    // dropSchema: true,
    entities: [
        User_1.User,
        Role_1.Role,
        RegistrationPlate_1.RegistrationPlate,
        ParkingZone_1.ParkingZone,
        ParkingSpot_1.ParkingSpot,
        Ticket_1.Ticket,
        Payment_1.Payment,
    ],
});
