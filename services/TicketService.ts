import { TicketRepository } from "../repositories/TicketRepository";
import { ITicketService } from "./interfaces/ITicketService";

export class TicketService implements ITicketService {
  private repo = new TicketRepository();

  async getAllTickets() {
    return this.repo.findAll();
  }

  async getTicketById(id: number) {
    return this.repo.findById(id);
  }

  async createTicket(data: any) {
    const ticket = this.repo.create(data);
    return this.repo.save(ticket);
  }

  async updateTicket(id: number, data: any) {
    const ticket = await this.repo.findById(id);
    if (!ticket) return null;
    Object.assign(ticket, data);
    return this.repo.save(ticket);
  }

  async deleteTicket(id: number) {
    return this.repo.delete(id);
  }
}
