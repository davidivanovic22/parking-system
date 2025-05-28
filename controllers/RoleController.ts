import { Request, Response } from "express";
import { RoleService } from "../services/RoleService";

export class RoleController {
  private roleService = new RoleService();

  async all(req: Request, res: Response) {
    try {
      const roles = await this.roleService.getAllRoles();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch roles", error });
    }
  }

  async one(req: Request, res: Response) {
    const role = await this.roleService.getRoleById(+req.params.id);
    if (!role) return res.status(404).send("Role not found");
    res.json(role);
  }

  async save(req: Request, res: Response) {
    const result = await this.roleService.createRole(req.body);
    res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.roleService.updateRole(+req.params.id, req.body);
    if (!result) return res.status(404).send("Role not found");
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.roleService.deleteRole(+req.params.id);
    res.json(result);
  }
}
