import bcrypt from "bcrypt";
import { DeleteResult } from "typeorm";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";

jest.mock("../repositories/UserRepository");

describe("UserService", () => {
  let userService: UserService;
  let userRepoMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepoMock = new UserRepository() as jest.Mocked<UserRepository>;

    userService = new UserService();
    // Inject mocked repo
    // @ts-ignore
    userService["userRepo"] = userRepoMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all users without passwords", async () => {
    userRepoMock.findAll.mockResolvedValue([
      {
        id: 1,
        name: "Alice",
        email: "a@example.com",
        password: "hashed",
      } as User,
    ]);

    const result = await userService.getAllUsers();

    expect(result).toEqual([{ id: 1, name: "Alice", email: "a@example.com" }]);
    expect(result[0]).not.toHaveProperty("password");
  });

  it("should return user by ID", async () => {
    const user = { id: 1, name: "Bob" } as User;
    userRepoMock.findById.mockResolvedValue(user);

    const result = await userService.getUserById(1);

    expect(result).toEqual(user);
  });

  it("should create user", async () => {
    const inputUser = { name: "Charlie", password: "secret" } as User;
    const createdUser = { ...inputUser, id: 1 } as User;

    userRepoMock.create.mockReturnValue(createdUser);
    userRepoMock.save.mockResolvedValue(createdUser);

    const result = await userService.createUser(inputUser);

    expect(userRepoMock.create).toHaveBeenCalledWith(inputUser);
    expect(userRepoMock.save).toHaveBeenCalledWith(createdUser);
    expect(result).toEqual(createdUser);
  });

  it("should update user and hash password if provided", async () => {
    const existingUser = {
      id: 1,
      name: "Dave",
      password: "old-hash",
    } as User;

    const newUserData = {
      name: "David",
      password: "new-password",
    } as User;

    userRepoMock.findById.mockResolvedValue(existingUser);
    userRepoMock.save.mockImplementation(async (user) => user);

    const result = await userService.updateUser(1, newUserData);

    expect(result?.name).toBe("David");
    expect(await bcrypt.compare("new-password", result!.password)).toBeTruthy();
    expect(userRepoMock.save).toHaveBeenCalled();
  });

  it("should not update if user not found", async () => {
    userRepoMock.findById.mockResolvedValue(null);

    const result = await userService.updateUser(99, { name: "Ghost" } as User);

    expect(result).toBeNull();
    expect(userRepoMock.save).not.toHaveBeenCalled();
  });

  it("should delete user by ID", async () => {
    const deleteResult: DeleteResult = { affected: 1, raw: [] };
    userRepoMock.delete.mockResolvedValue(deleteResult);

    const result = await userService.deleteUser(1);

    expect(userRepoMock.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual(deleteResult);
  });
});
