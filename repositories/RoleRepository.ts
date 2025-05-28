import { Repository } from "typeorm";
import { Database } from "../config/Database";
import { Role } from "../entities/Role";

export class RoleRepository {
  private repo: Repository<Role>;

  constructor() {
    this.repo = Database.getInstance().getRepository(Role);
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(data: Partial<Role>) {
    return this.repo.create(data);
  }

  save(role: Role) {
    return this.repo.save(role);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
