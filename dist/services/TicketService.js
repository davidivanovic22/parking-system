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
exports.TicketService = void 0;
const data_source_ts_1 = require("../config/data-source.ts");
const Ticket_1 = require("../entities/Ticket");
class TicketService {
    constructor() {
        this.repo = data_source_ts_1.AppDataSource.getRepository(Ticket_1.Ticket);
    }
    getAllTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.find();
        });
    }
    getTicketById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findOneBy({ id });
        });
    }
    createTicket(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = this.repo.create(data);
            return this.repo.save(ticket);
        });
    }
    updateTicket(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield this.repo.findOneBy({ id });
            if (!ticket)
                return null;
            this.repo.merge(ticket, data);
            return this.repo.save(ticket);
        });
    }
    deleteTicket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.delete(id);
        });
    }
}
exports.TicketService = TicketService;
