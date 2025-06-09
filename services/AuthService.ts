import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { In, Repository } from "typeorm";
import { Database } from "../config/Database";
import { Role } from "../entities/Role";
import { User } from "../entities/User";
import { IAuthService, RegisterDTO } from "./interfaces/IAuthService";
import { UserService } from "./UserService";
import { HttpException } from "../exceptions/HttpExceptions";

export class AuthService implements IAuthService {
  private dataSource = Database.getInstance();
  private userService = new UserService();
  private userRepo: Repository<User> | null = null;
  private roleRepo: Repository<Role> | null = null;

  private JWT_SECRET = process.env.JWT_SECRET || "secret";
  private REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_secret";

  private getUserRepo(): Repository<User> {
    if (!this.userRepo) {
      if (!this.dataSource.isInitialized) {
        throw new HttpException(500, "Database not initialized");
      }
      this.userRepo = this.dataSource.getRepository(User);
    }
    return this.userRepo;
  }

  private getRoleRepo(): Repository<Role> {
    if (!this.roleRepo) {
      if (!this.dataSource.isInitialized) {
        throw new HttpException(500, "Database not initialized");
      }
      this.roleRepo = this.dataSource.getRepository(Role);
    }
    return this.roleRepo;
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new HttpException(400, "Email and password are required");
    }

    const userRepo = this.getUserRepo();
    const user = await userRepo.findOne({
      where: { email },
      relations: ["roles"],
    });

    if (!user) {
      throw new HttpException(401, "User does not exist");
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      throw new HttpException(401, "Incorrect password");
    }

    const roles = user.roles || [];
    if (roles.length === 0) {
      throw new HttpException(403, "User has no roles assigned");
    }

    const payload: JwtPayload = {
      email: user.email,
      roles,
    };

    try {
      const accessToken = jwt.sign(payload, this.JWT_SECRET, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(payload, this.REFRESH_SECRET, {
        expiresIn: "7d",
      });
      return { accessToken, refreshToken };
    } catch (err) {
      throw new HttpException(500, "Failed to generate tokens");
    }
  }

  async register(data: RegisterDTO): Promise<{ message: string }> {
    if (!data.email || !data.username || !data.password || !data.roles) {
      throw new HttpException(400, "Missing required registration data");
    }

    if (data.password.trim().length < 6) {
      throw new HttpException(400, "Password must be at least 6 characters");
    }

    const userRepo = this.getUserRepo();
    const roleRepo = this.getRoleRepo();

    const existingUser = await userRepo.findOne({
      where: [{ email: data.email }, { username: data.username }],
    });
    if (existingUser) {
      throw new HttpException(
        409,
        "User with this email or username already exists"
      );
    }

    const roles = await roleRepo.findBy({ id: In(data.roles) });
    if (roles.length !== data.roles.length) {
      throw new HttpException(400, "Invalid role IDs supplied");
    }

    try {
      const userEntity = new User();
      Object.assign(userEntity, data);
      userEntity.roles = roles;

      await this.userService.createUser(userEntity);
      return { message: "User registered successfully" };
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(500, "Registration error: " + err.message);
      } else {
        throw new HttpException(500, "An unexpected error occurred");
      }
    }
  }

  async refreshToken(token: string) {
    try {
      const payload = jwt.verify(token, this.REFRESH_SECRET) as JwtPayload;
      const newAccessToken = jwt.sign(
        { email: payload.email, roles: payload.roles },
        this.JWT_SECRET,
        { expiresIn: "15m" }
      );
      return { accessToken: newAccessToken };
    } catch {
      throw new HttpException(401, "Invalid refresh token");
    }
  }
}
