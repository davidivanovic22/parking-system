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
exports.RoleController = void 0;
const RoleService_1 = require("../services/RoleService");
class RoleController {
    constructor() {
        this.roleService = new RoleService_1.RoleService();
    }
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield this.roleService.getAllRoles();
                res.json(roles);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to fetch roles", error });
            }
        });
    }
    one(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.roleService.getRoleById(+req.params.id);
            if (!role)
                return res.status(404).send("Role not found");
            res.json(role);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.roleService.createRole(req.body);
            res.status(201).json(result);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.roleService.updateRole(+req.params.id, req.body);
            if (!result)
                return res.status(404).send("Role not found");
            res.json(result);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.roleService.deleteRole(+req.params.id);
            res.json(result);
        });
    }
}
exports.RoleController = RoleController;
