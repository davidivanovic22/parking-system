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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const data_source_ts_1 = require("../config/data-source.ts");
const Role_1 = require("../entities/Role");
class RoleService {
    constructor() {
        this.repo = data_source_ts_1.AppDataSource.getRepository(Role_1.Role);
    }
    getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.find();
        });
    }
    getRoleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findOneBy({ id });
        });
    }
    createRole(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = this.repo.create(data);
            return this.repo.save(role);
        });
    }
    updateRole(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.repo.findOneBy({ id });
            if (!role)
                return null;
            this.repo.merge(role, data);
            return this.repo.save(role);
        });
    }
    deleteRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.delete(id);
        });
    }
}
exports.RoleService = RoleService;
