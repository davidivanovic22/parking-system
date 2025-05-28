import { Request, Response } from "express";
import { PaymentService } from "../services/PaymentService";

export class PaymentController {
  private paymentService = new PaymentService();

  async all(req: Request, res: Response) {
    const payments = await this.paymentService.getAllPayments();
    res.json(payments);
  }

  async one(req: Request, res: Response) {
    const payment = await this.paymentService.getPaymentById(+req.params.id);
    if (!payment) return res.status(404).send("Payment not found");
    res.json(payment);
  }

  async save(req: Request, res: Response) {
    const result = await this.paymentService.createPayment(req.body);
    res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.paymentService.updatePayment(
      +req.params.id,
      req.body
    );
    if (!result) return res.status(404).send("Payment not found");
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.paymentService.deletePayment(+req.params.id);
    res.json(result);
  }
}
