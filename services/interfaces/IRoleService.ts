import { Role } from "../../entities/Role";

export interface IRoleService {
  getAllRoles(): Promise<Partial<Role>[]>;
  getRoleById(id: number): Promise<Role | null>;
  createRole(data: any): Promise<Role>;
  updateRole(id: number, data: any): Promise<Role | null>;
  deleteRole(id: number): Promise<any>;
}
