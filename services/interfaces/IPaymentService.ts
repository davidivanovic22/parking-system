import { Payment } from "../../entities/Payment";

export interface IPaymentService {
  getAllPayments(): Promise<Partial<Payment>[]>;
  getPaymentById(id: number): Promise<Payment | null>;
  createPayment(data: any): Promise<Payment>;
  updatePayment(id: number, data: any): Promise<Payment | null>;
  deletePayment(id: number): Promise<any>;
}
