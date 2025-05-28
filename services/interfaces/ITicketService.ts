import { Ticket } from "../../entities/Ticket";

export interface ITicketService {
  getAllTickets(): Promise<Partial<Ticket>[]>;
  getTicketById(id: number): Promise<Ticket | null>;
  createTicket(data: any): Promise<Ticket>;
  updateTicket(id: number, data: any): Promise<Ticket | null>;
  deleteTicket(id: number): Promise<any>;
}
