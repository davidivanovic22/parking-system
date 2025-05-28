import { PaymentRepository } from "../repositories/PaymentRepository";
import { IPaymentService } from "./interfaces/IPaymentService";

export class PaymentService implements IPaymentService {
  private repo = new PaymentRepository();

  async getAllPayments() {
    return this.repo.findAll();
  }

  async getPaymentById(id: number) {
    return this.repo.findById(id);
  }

  async createPayment(data: any) {
    const payment = this.repo.create(data);
    return this.repo.save(payment);
  }

  async updatePayment(id: number, data: any) {
    const payment = await this.repo.findById(id);
    if (!payment) return null;
    Object.assign(payment, data);
    return this.repo.save(payment);
  }

  async deletePayment(id: number) {
    return this.repo.delete(id);
  }
}
