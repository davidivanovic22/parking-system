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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const promise_1 = __importDefault(require("mysql2/promise"));
const routes_1 = __importDefault(require("./routes/routes"));
const data_source_ts_1 = require("./config/data-source.ts");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use(express_1.default.json());
function createDatabaseIfNotExists() {
    return __awaiter(this, void 0, void 0, function* () {
        const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;
        const connection = yield promise_1.default.createConnection({
            host: DB_HOST,
            port: Number(DB_PORT) || 3306,
            user: DB_USER,
            password: DB_PASS,
        });
        yield connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
        yield connection.end();
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield createDatabaseIfNotExists();
            yield data_source_ts_1.AppDataSource.initialize();
            app.use("/api", routes_1.default);
            app.listen(3001, () => {
                console.log("Server running on http://localhost:3001");
            });
        }
        catch (error) {
            console.error("Error starting the server:", error);
        }
    });
}
main();
