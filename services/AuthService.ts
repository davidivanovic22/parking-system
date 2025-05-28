import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { Database } from "../config/Database";
import { Repository } from "typeorm";
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

  async register(data: RegisterDTO) {
    const { name, email, username, password, roles } = data;

    if (!name || !email || !username || !password || !roles?.length) {
      throw new Error("All fields and at least one role are required");
    }

    const userRepo = this.getUserRepo();
    const roleRepo = this.getRoleRepo();

    const existing = await userRepo.findOne({
      where: [{ email }, { username }],
    });

    if (existing) {
      throw new Error("User already exists");
    }

    // Find roles, validate all roles are found
    const foundRoles = await roleRepo.findByIds(roles);
    if (foundRoles.length !== roles.length) {
      throw new Error("Invalid role(s)");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepo.create({
      name,
      email,
      username,
      password: hashedPassword,
      roles: foundRoles,
    });

    await userRepo.save(user);

    return { message: "User registered" };
  }

  async login(email: string, password: string) {
    const userRepo = this.getUserRepo();

    const user = await userRepo.findOne({
      where: { email },
      relations: ["roles"],
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
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
