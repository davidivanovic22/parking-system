import { UserRepository } from "../repositories/UserRepository";
import { IUserService } from "./interfaces/IUserService";

export class UserService implements IUserService {
  private userRepo = new UserRepository();

  async getAllUsers() {
    const users = await this.userRepo.findAll();
    return users.map(({ password, ...user }) => user);
  }

  async getUserById(id: number) {
    return this.userRepo.findById(id);
  }

  async createUser(data: any) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async updateUser(id: number, data: any) {
    const user = await this.userRepo.findById(id);
    if (!user) return null;
    Object.assign(user, data);
    return this.userRepo.save(user);
  }

  async deleteUser(id: number) {
    return this.userRepo.delete(id);
  }
}
