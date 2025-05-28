import { Repository } from "typeorm";
import { Database } from "../config/Database";
import { Payment } from "../entities/Payment";

export class PaymentRepository {
  private repo: Repository<Payment>;

  constructor() {
    this.repo = Database.getInstance().getRepository(Payment);
  }

  findAll() {
    return this.repo.find({ relations: ["spot", "ticket", "plate"] });
  }

  findById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ["spot", "ticket", "plate"],
    });
  }

  create(data: Partial<Payment>) {
    return this.repo.create(data);
  }

  save(payment: Payment) {
    return this.repo.save(payment);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
