import bcrypt from "bcrypt";
import { User } from "../entities/User";
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

  async createUser(data: User) {
    if (data.password) {
      data.password = data.password.trim();
    }
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async updateUser(id: number, data: User): Promise<User | null> {
    const user = await this.userRepo.findById(id);
    if (!user) return null;

    if (typeof data.password === "string" && data.password.trim() !== "") {
      const trimmedPassword = data.password.trim();
      const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
      user.password = hashedPassword;
    }

    const { password, ...restData } = data;

    Object.assign(user, restData);

    return this.userRepo.save(user);
  }

  async deleteUser(id: number) {
    return this.userRepo.delete(id);
  }
}
