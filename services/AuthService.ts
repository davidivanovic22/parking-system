import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { Database } from "../config/Database";
import { In, Repository } from "typeorm";
import { IAuthService, RegisterDTO } from "./interfaces/IAuthService";

export class AuthService implements IAuthService {
  private dataSource = Database.getInstance();

  private userRepo: Repository<User> | null = null;
  private roleRepo: Repository<Role> | null = null;

  private JWT_SECRET = process.env.JWT_SECRET || "secret";
  private REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_secret";

  private getUserRepo(): Repository<User> {
    if (!this.userRepo) {
      if (!this.dataSource.isInitialized) {
        throw new Error("Database not initialized");
      }
      this.userRepo = this.dataSource.getRepository(User);
    }
    return this.userRepo;
  }

  private getRoleRepo(): Repository<Role> {
    if (!this.roleRepo) {
      if (!this.dataSource.isInitialized) {
        throw new Error("Database not initialized");
      }
      this.roleRepo = this.dataSource.getRepository(Role);
    }
    return this.roleRepo;
  }

  async register(data: RegisterDTO): Promise<{ message: string }> {
    const userRepo = this.getUserRepo();
    const roleRepo = this.getRoleRepo();

    // Check if user with email or username already exists
    const existingUser = await userRepo.findOne({
      where: [{ email: data.email }, { username: data.username }],
    });
    if (existingUser) {
      throw new Error("Email or username already in use");
    }

    // Trim password before hashing
    const trimmedPassword = data.password.trim();

    // Load roles by IDs
    const roles = await roleRepo.findBy({ id: In(data.roles) });
    if (roles.length !== data.roles.length) {
      throw new Error("One or more roles are invalid");
    }

    // Create user entity with hashed password
    const user = userRepo.create({
      name: data.name,
      email: data.email,
      username: data.username,
      password: trimmedPassword,
      roles: roles,
    });

    // Save to DB
    await userRepo.save(user);

    return { message: "User registered successfully" };
  }

  async login(email: string, password: string) {
    const userRepo = this.getUserRepo();

    const user = await userRepo.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Trim input password for safety
    const trimmedPassword = password.trim();

    const isMatch = await bcrypt.compare(trimmedPassword, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const payload: JwtPayload = { userId: user.id, email: user.email };

    const accessToken = jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, this.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    try {
      const payload = jwt.verify(token, this.REFRESH_SECRET) as JwtPayload;

      const newAccessToken = jwt.sign(
        { userId: payload.userId, email: payload.email },
        this.JWT_SECRET,
        { expiresIn: "15m" }
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new Error("Invalid refresh token");
    }
  }
}
