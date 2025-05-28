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
exports.Payment = void 0;
const typeorm_1 = require("typeorm");
const ParkingSpot_1 = require("./ParkingSpot");
const Ticket_1 = require("./Ticket");
const RegistrationPlate_1 = require("./RegistrationPlate");
let Payment = class Payment {
};
exports.Payment = Payment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", { name: "PAYMENT_ID" }),
    __metadata("design:type", Number)
], Payment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ParkingSpot_1.ParkingSpot, (spot) => spot.payments),
    __metadata("design:type", ParkingSpot_1.ParkingSpot)
], Payment.prototype, "spot", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "SPOT_ID", nullable: true }),
    __metadata("design:type", Number)
], Payment.prototype, "spotId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Ticket_1.Ticket, (ticket) => ticket.payments),
    __metadata("design:type", Ticket_1.Ticket)
], Payment.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "TICKET_ID" }),
    __metadata("design:type", Number)
], Payment.prototype, "ticketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RegistrationPlate_1.RegistrationPlate),
    __metadata("design:type", RegistrationPlate_1.RegistrationPlate)
], Payment.prototype, "plate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PLATE_NUMBER" }),
    __metadata("design:type", String)
], Payment.prototype, "plateNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "AMOUNT", type: "decimal" }),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "TRANSACTIONTIME", type: "date" }),
    __metadata("design:type", Date)
], Payment.prototype, "transactionTime", void 0);
exports.Payment = Payment = __decorate([
    (0, typeorm_1.Entity)("PAYMENT")
], Payment);
