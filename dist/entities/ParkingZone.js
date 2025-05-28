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
exports.ParkingZone = void 0;
const typeorm_1 = require("typeorm");
const ParkingSpot_1 = require("./ParkingSpot");
let ParkingZone = class ParkingZone {
};
exports.ParkingZone = ParkingZone;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", { name: "ZONE_ID" }),
    __metadata("design:type", Number)
], ParkingZone.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "NAME_ZONE" }),
    __metadata("design:type", String)
], ParkingZone.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PRICE", type: "decimal" }),
    __metadata("design:type", Number)
], ParkingZone.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ParkingSpot_1.ParkingSpot, (spot) => spot.zone),
    __metadata("design:type", Array)
], ParkingZone.prototype, "spots", void 0);
exports.ParkingZone = ParkingZone = __decorate([
    (0, typeorm_1.Entity)("PARKINGZONE")
], ParkingZone);
