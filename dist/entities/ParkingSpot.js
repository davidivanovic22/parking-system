"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSpot = void 0;
const typeorm_1 = require("typeorm");
const ParkingZone_1 = require("./ParkingZone");
const Ticket_1 = require("./Ticket");
let ParkingSpot = class ParkingSpot {
};
exports.ParkingSpot = ParkingSpot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", { name: "SPOT_ID" }),
    __metadata("design:type", Number)
], ParkingSpot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "STREET" }),
    __metadata("design:type", String)
], ParkingSpot.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ISOCCUPIED", type: "boolean" }),
    __metadata("design:type", Boolean)
], ParkingSpot.prototype, "isOccupied", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ParkingZone_1.ParkingZone, (zone) => zone.spots),
    __metadata("design:type", ParkingZone_1.ParkingZone)
], ParkingSpot.prototype, "zone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ZONE_ID" }),
    __metadata("design:type", Number)
], ParkingSpot.prototype, "zoneId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Ticket_1.Payment, (payment) => payment.spot),
    __metadata("design:type", Array)
], ParkingSpot.prototype, "payments", void 0);
exports.ParkingSpot = ParkingSpot = __decorate([
    (0, typeorm_1.Entity)("PARKINGSPOT")
], ParkingSpot);
