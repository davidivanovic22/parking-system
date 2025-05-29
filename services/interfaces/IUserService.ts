import { User } from "../../entities/User";

export interface IUserService {
  getAllUsers(): Promise<Partial<User>[]>;
  getUserById(id: number): Promise<User | null>;
  createUser(data: User): Promise<User>;
  updateUser(id: number, data: User): Promise<User | null>;
  deleteUser(id: number): Promise<any>;
}
