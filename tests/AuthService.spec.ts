import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { Database } from "../config/Database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../services/UserService");
jest.mock("../config/Database");

describe("AuthService", () => {
  let authService: AuthService;
  let userRepoMock: jest.Mocked<Repository<User>>;
  let roleRepoMock: jest.Mocked<Repository<Role>>;
  let userServiceMock: jest.Mocked<UserService>;

  const user: User = {
    id: 1,
    name: "Test User",
    email: "test@example.com",
    username: "testuser",
    password: "hashedpass",
    plates: [],
    roles: [],
    hashPassword: jest.fn(),
  };

  const role: Role = {
    id: 1,
    name: "admin",
    users: [],
  };

  beforeEach(() => {
    const dbMock = {
      isInitialized: true,
      getRepository: jest.fn(),
    };

    const userRepo = {
      findOne: jest.fn(),
      findBy: jest.fn(),
    };

    const roleRepo = {
      findBy: jest.fn(),
    };

    const userService = {
      createUser: jest.fn(),
    };

    (Database.getInstance as jest.Mock).mockReturnValue(dbMock);
    (UserService as jest.Mock).mockImplementation(() => userService);

    dbMock.getRepository
      .mockImplementationOnce(() => userRepo)
      .mockImplementationOnce(() => roleRepo);

    authService = new AuthService();
    // @ts-ignore
    authService["userRepo"] = userRepo;
    // @ts-ignore
    authService["roleRepo"] = roleRepo;
    // @ts-ignore
    userServiceMock = authService["userService"];
    // @ts-ignore
    userRepoMock = authService["userRepo"];
    // @ts-ignore
    roleRepoMock = authService["roleRepo"];
  });

  describe("register", () => {
    it("should register a new user", async () => {
      userRepoMock.findOne.mockResolvedValue(null);
      roleRepoMock.findBy.mockResolvedValue([role]);

      const data = {
        name: "Test",
        email: "test@example.com",
        username: "testuser",
        password: "123456",
        roles: [1],
      };

      await expect(authService.register(data)).resolves.toEqual({
        message: "User registered successfully",
      });

      expect(userServiceMock.createUser).toHaveBeenCalled();
    });

    it("should throw error if user exists", async () => {
      userRepoMock.findOne.mockResolvedValue(user);

      await expect(
        authService.register({
          name: "Test",
          email: "test@example.com",
          username: "testuser",
          password: "123456",
          roles: [1],
        })
      ).rejects.toThrow("Email or username already in use");
    });

    it("should throw error if role is invalid", async () => {
      userRepoMock.findOne.mockResolvedValue(null);
      roleRepoMock.findBy.mockResolvedValue([]);

      await expect(
        authService.register({
          name: "Test",
          email: "test@example.com",
          username: "testuser",
          password: "123456",
          roles: [99],
        })
      ).rejects.toThrow("One or more roles are invalid");
    });
  });

  describe("login", () => {
    it("should return tokens on valid credentials", async () => {
      user.roles = [role];
      userRepoMock.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockImplementation(() => "token");

      const result = await authService.login("test@example.com", "123456");

      expect(result).toEqual({
        accessToken: "token",
        refreshToken: "token",
      });
    });

    it("should throw error on invalid email", async () => {
      userRepoMock.findOne.mockResolvedValue(null);

      await expect(
        authService.login("invalid@example.com", "123456")
      ).rejects.toThrow("Invalid credentials");
    });

    it("should throw error on wrong password", async () => {
      userRepoMock.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.login("test@example.com", "wrongpass")
      ).rejects.toThrow("Invalid credentials");
    });
  });

  describe("refreshToken", () => {
    it("should return new access token", async () => {
      (jwt.verify as jest.Mock).mockReturnValue({
        email: "test@example.com",
        roles: [role],
      });
      (jwt.sign as jest.Mock).mockReturnValue("newAccessToken");

      const result = await authService.refreshToken("validToken");

      expect(result).toEqual({ accessToken: "newAccessToken" });
    });

    it("should throw error on invalid token", async () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("invalid");
      });

      await expect(authService.refreshToken("badToken")).rejects.toThrow(
        "Invalid refresh token"
      );
    });
  });
});
