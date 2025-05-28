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
exports.Payment = exports.Ticket = void 0;
const typeorm_1 = require("typeorm");
const Payment_1 = require("./Payment");
Object.defineProperty(exports, "Payment", { enumerable: true, get: function () { return Payment_1.Payment; } });
let Ticket = class Ticket {
};
exports.Ticket = Ticket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", { name: "TICKET_ID" }),
    __metadata("design:type", Number)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "PRICE", type: "decimal" }),
    __metadata("design:type", Number)
], Ticket.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "STARTTIME", type: "datetime" }),
    __metadata("design:type", Date)
], Ticket.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ENDTIME", type: "datetime" }),
    __metadata("design:type", Date)
], Ticket.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ISACTIVE", type: "boolean" }),
    __metadata("design:type", Boolean)
], Ticket.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Payment_1.Payment, (payment) => payment.ticket),
    __metadata("design:type", Array)
], Ticket.prototype, "payments", void 0);
exports.Ticket = Ticket = __decorate([
    (0, typeorm_1.Entity)("TICKET")
], Ticket);
