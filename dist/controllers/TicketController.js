"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const TicketService_1 = require("../services/TicketService");
class TicketController {
    constructor() {
        this.ticketService = new TicketService_1.TicketService();
    }
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tickets = yield this.ticketService.getAllTickets();
            res.json(tickets);
        });
    }
    one(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield this.ticketService.getTicketById(+req.params.id);
            if (!ticket)
                return res.status(404).send("Ticket not found");
            res.json(ticket);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.ticketService.createTicket(req.body);
            res.status(201).json(result);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.ticketService.updateTicket(+req.params.id, req.body);
            if (!result)
                return res.status(404).send("Ticket not found");
            res.json(result);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.ticketService.deleteTicket(+req.params.id);
            res.json(result);
        });
    }
}
exports.TicketController = TicketController;
