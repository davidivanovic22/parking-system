import { RoleRepository } from "../repositories/RoleRepository";
import { IRoleService } from "./interfaces/IRoleService";

export class RoleService implements IRoleService {
  private repo = new RoleRepository();

  async getAllRoles() {
    return this.repo.findAll();
  }

  async getRoleById(id: number) {
    return this.repo.findById(id);
  }

  async createRole(data: any) {
    const role = this.repo.create(data);
    return this.repo.save(role);
  }

  async updateRole(id: number, data: any) {
    const role = await this.repo.findById(id);
    if (!role) return null;
    Object.assign(role, data);
    return this.repo.save(role);
  }

  async deleteRole(id: number) {
    return this.repo.delete(id);
  }
}
