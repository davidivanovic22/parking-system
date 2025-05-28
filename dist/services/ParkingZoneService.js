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
exports.ParkingZoneService = void 0;
const data_source_ts_1 = require("../config/data-source.ts");
const ParkingZone_js_1 = require("../entities/ParkingZone.js");
class ParkingZoneService {
    constructor() {
        this.repo = data_source_ts_1.AppDataSource.getRepository(ParkingZone_js_1.ParkingZone);
    }
    getAllZones() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.find({ relations: ["spots"] });
        });
    }
    getZoneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findOne({
                where: { id },
                relations: ["spots"],
            });
        });
    }
    createZone(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const zone = this.repo.create(data);
            return this.repo.save(zone);
        });
    }
    updateZone(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const zone = yield this.repo.findOneBy({ id });
            if (!zone)
                return null;
            this.repo.merge(zone, data);
            return this.repo.save(zone);
        });
    }
    deleteZone(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.delete(id);
        });
    }
}
exports.ParkingZoneService = ParkingZoneService;
