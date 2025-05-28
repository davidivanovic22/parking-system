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
exports.ParkingSpotService = void 0;
const data_source_ts_1 = require("../config/data-source.ts");
const ParkingSpot_1 = require("../entities/ParkingSpot");
class ParkingSpotService {
    constructor() {
        this.repo = data_source_ts_1.AppDataSource.getRepository(ParkingSpot_1.ParkingSpot);
    }
    getAllSpots() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.find({ relations: ["zone"] });
        });
    }
    getSpotById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findOne({
                where: { id },
                relations: ["zone"],
            });
        });
    }
    createSpot(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const spot = this.repo.create(data);
            return this.repo.save(spot);
        });
    }
    updateSpot(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const spot = yield this.repo.findOneBy({ id });
            if (!spot)
                return null;
            this.repo.merge(spot, data);
            return this.repo.save(spot);
        });
    }
    deleteSpot(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.delete(id);
        });
    }
}
exports.ParkingSpotService = ParkingSpotService;
