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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const data_source_ts_1 = require("../config/data-source.ts");
const User_1 = require("../entities/User");
class UserService {
    constructor() {
        this.userRepo = data_source_ts_1.AppDataSource.getRepository(User_1.User);
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepo.find({ relations: ["roles", "plates"] });
            return users.map((_a) => {
                var { password } = _a, user = __rest(_a, ["password"]);
                return user;
            });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.findOne({
                where: { id },
                relations: ["roles", "plates"],
            });
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userRepo.create(data);
            return this.userRepo.save(user);
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOneBy({ id });
            if (!user)
                return null;
            this.userRepo.merge(user, data);
            return this.userRepo.save(user);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.delete(id);
        });
    }
}
exports.UserService = UserService;
