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
exports.RegistrationPlateService = void 0;
const data_source_ts_1 = require("../config/data-source.ts");
const RegistrationPlate_1 = require("../entities/RegistrationPlate");
class RegistrationPlateService {
    constructor() {
        this.repo = data_source_ts_1.AppDataSource.getRepository(RegistrationPlate_1.RegistrationPlate);
    }
    getAllPlates() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.find({ relations: ["user"] });
        });
    }
    getPlateByNumber(plateNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findOne({
                where: { plateNumber },
                relations: ["user"],
            });
        });
    }
    createPlate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const plate = this.repo.create(data);
            return this.repo.save(plate);
        });
    }
    updatePlate(plateNumber, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const plate = yield this.repo.findOneBy({ plateNumber });
            if (!plate)
                return null;
            this.repo.merge(plate, data);
            return this.repo.save(plate);
        });
    }
    deletePlate(plateNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.delete(plateNumber);
        });
    }
}
exports.RegistrationPlateService = RegistrationPlateService;
