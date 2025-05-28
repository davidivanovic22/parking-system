// controllers/TicketController.ts
import { Request, Response } from "express";
import { TicketService } from "../services/TicketService";

export class TicketController {
  private ticketService = new TicketService();

  async all(req: Request, res: Response) {
    const tickets = await this.ticketService.getAllTickets();
    res.json(tickets);
  }

  async one(req: Request, res: Response) {
    const ticket = await this.ticketService.getTicketById(+req.params.id);
    if (!ticket) return res.status(404).send("Ticket not found");
    res.json(ticket);
  }

  async save(req: Request, res: Response) {
    const result = await this.ticketService.createTicket(req.body);
    res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.ticketService.updateTicket(
      +req.params.id,
      req.body
    );
    if (!result) return res.status(404).send("Ticket not found");
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.ticketService.deleteTicket(+req.params.id);
    res.json(result);
  }
}
