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
exports.PaymentController = void 0;
const PaymentService_1 = require("../services/PaymentService");
class PaymentController {
    constructor() {
        this.paymentService = new PaymentService_1.PaymentService();
    }
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payments = yield this.paymentService.getAllPayments();
            res.json(payments);
        });
    }
    one(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield this.paymentService.getPaymentById(+req.params.id);
            if (!payment)
                return res.status(404).send("Payment not found");
            res.json(payment);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.paymentService.createPayment(req.body);
            res.status(201).json(result);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.paymentService.updatePayment(+req.params.id, req.body);
            if (!result)
                return res.status(404).send("Payment not found");
            res.json(result);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.paymentService.deletePayment(+req.params.id);
            res.json(result);
        });
    }
}
exports.PaymentController = PaymentController;
