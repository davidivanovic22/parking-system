"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const Role_1 = require("../entities/Role");
const data_source_ts_1 = require("../config/data-source.ts");
class AuthService {
    constructor() {
        this.userRepo = data_source_ts_1.AppDataSource.getRepository(User_1.User);
        this.roleRepo = data_source_ts_1.AppDataSource.getRepository(Role_1.Role);
        this.JWT_SECRET = process.env.JWT_SECRET || "secret";
        this.REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_secret";
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, username, password, roles } = data;
            if (!name || !email || !username || !password || !(roles === null || roles === void 0 ? void 0 : roles.length))
                throw new Error("All fields and at least one role are required");
            const existing = yield this.userRepo.findOne({
                where: [{ email }, { username }],
            });
            if (existing)
                throw new Error("User already exists");
            const foundRoles = yield this.roleRepo.findByIds(roles);
            if (foundRoles.length !== roles.length)
                throw new Error("Invalid role(s)");
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = this.userRepo.create({
                name,
                email,
                username,
                password: hashedPassword,
                roles: foundRoles,
            });
            yield this.userRepo.save(user);
            return { message: "User registered" };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOne({
                where: { email },
                relations: ["roles"],
            });
            if (!user)
                throw new Error("Invalid credentials");
            const match = yield bcrypt_1.default.compare(password, user.password);
            if (!match)
                throw new Error("Invalid credentials");
            const payload = { userId: user.id, email: user.email };
            const accessToken = jsonwebtoken_1.default.sign(payload, this.JWT_SECRET, {
                expiresIn: "15m",
            });
            const refreshToken = jsonwebtoken_1.default.sign(payload, this.REFRESH_SECRET, {
                expiresIn: "7d",
            });
            return { accessToken, refreshToken };
        });
    }
    refreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = jsonwebtoken_1.default.verify(token, this.REFRESH_SECRET);
                const newAccessToken = jsonwebtoken_1.default.sign({ userId: payload.userId, email: payload.email }, this.JWT_SECRET, { expiresIn: "15m" });
                return { accessToken: newAccessToken };
            }
            catch (_a) {
                throw new Error("Invalid refresh token");
            }
        });
    }
}
exports.AuthService = AuthService;
