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
exports.AuthController = void 0;
const express_1 = require("express");
const AuthService_1 = require("../services/AuthService");
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.authService.register(req.body);
                res.status(201).json(result);
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const tokens = yield this.authService.login(email, password);
                res.json(tokens);
            }
            catch (err) {
                res.status(401).json({ message: err.message });
            }
        });
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.body.refreshToken;
            if (!token) {
                res.status(400).json({ message: "Missing refresh token" });
                return;
            }
            try {
                const result = yield this.authService.refreshToken(token);
                res.json(result);
            }
            catch (err) {
                res.status(401).json({ message: err.message });
            }
        });
        this.router = (0, express_1.Router)();
        this.authService = new AuthService_1.AuthService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Use inline arrow functions or bind this explicitly
        this.router.post("/register", (req, res) => this.register(req, res));
        this.router.post("/login", (req, res) => this.login(req, res));
        this.router.post("/refresh", (req, res) => this.refreshToken(req, res));
    }
}
exports.AuthController = AuthController;
