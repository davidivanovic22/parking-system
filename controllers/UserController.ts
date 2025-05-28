import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService = new UserService();

  async all(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }

  async one(req: Request, res: Response) {
    const user = await this.userService.getUserById(+req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  }

  async save(req: Request, res: Response) {
    const result = await this.userService.createUser(req.body);
    res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.userService.updateUser(+req.params.id, req.body);
    if (!result) return res.status(404).send("User not found");
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.userService.deleteUser(+req.params.id);
    res.json(result);
  }
}
