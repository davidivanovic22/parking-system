import bcrypt from "bcrypt";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { IUserService } from "./interfaces/IUserService";
import { HttpException } from "../exceptions/HttpExceptions";

export class UserService implements IUserService {
  private userRepo = new UserRepository();

  async getAllUsers() {
    const users = await this.userRepo.findAll();
    return users.map(({ password, ...user }) => user);
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new HttpException(404, "User not found");
    return user;
  }

  async createUser(data: User) {
    if (!data || !data.email || !data.username || !data.password) {
      throw new HttpException(400, "Missing required fields");
    }

    if (data.password) {
      data.password = data.password.trim();
      if (data.password.length < 6) {
        throw new HttpException(
          400,
          "Password must be at least 6 characters long"
        );
      }
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      const user = this.userRepo.create(data);
      return await this.userRepo.save(user);
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(500, "Failed to create user: " + err.message);
      } else {
        throw new HttpException(500, "An unexpected error occurred");
      }
    }
  }

  async updateUser(id: number, data: User): Promise<User | null> {
    if (!id || typeof id !== "number") {
      throw new HttpException(400, "Invalid ID");
    }

    const user = await this.userRepo.findById(id);
    if (!user) throw new HttpException(404, "User not found");

    if (data.password && data.password.trim().length < 6) {
      throw new HttpException(400, "Password too short");
    }

    try {
      if (data.password) {
        user.password = await bcrypt.hash(data.password.trim(), 10);
      }
      const { password, ...restData } = data;
      Object.assign(user, restData);
      return await this.userRepo.save(user);
    } catch (err) {
      throw new HttpException(500, "Failed to update user");
    }
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new HttpException(404, "User not found");

    try {
      return await this.userRepo.delete(id);
    } catch {
      throw new HttpException(500, "Failed to delete user");
    }
  }
}
