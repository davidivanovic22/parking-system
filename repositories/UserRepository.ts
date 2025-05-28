import { Repository } from "typeorm";
import { Database } from "../config/Database";
import { User } from "../entities/User";

export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = Database.getInstance().getRepository(User);
  }

  findAll() {
    return this.repo.find({ relations: ["roles", "plates"] });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id }, relations: ["roles", "plates"] });
  }

  create(data: Partial<User>) {
    return this.repo.create(data);
  }

  save(user: User) {
    return this.repo.save(user);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
