import { Repository } from "typeorm";
import { Database } from "../config/Database";
import { Ticket } from "../entities/Ticket";

export class TicketRepository {
  private repo: Repository<Ticket>;

  constructor() {
    this.repo = Database.getInstance().getRepository(Ticket);
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(data: Partial<Ticket>) {
    return this.repo.create(data);
  }

  save(ticket: Ticket) {
    return this.repo.save(ticket);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
