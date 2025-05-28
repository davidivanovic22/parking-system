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
exports.PaymentService = void 0;
const data_source_ts_1 = require("../config/data-source.ts");
const Payment_1 = require("../entities/Payment");
class PaymentService {
    constructor() {
        this.repo = data_source_ts_1.AppDataSource.getRepository(Payment_1.Payment);
    }
    getAllPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.find({
                relations: ["spot", "ticket", "plate"],
            });
        });
    }
    getPaymentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findOne({
                where: { id },
                relations: ["spot", "ticket", "plate"],
            });
        });
    }
    createPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = this.repo.create(data);
            return this.repo.save(payment);
        });
    }
    updatePayment(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield this.repo.findOneBy({ id });
            if (!payment)
                return null;
            this.repo.merge(payment, data);
            return this.repo.save(payment);
        });
    }
    deletePayment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.delete(id);
        });
    }
}
exports.PaymentService = PaymentService;
