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
exports.RegistrationPlateController = void 0;
const RegistrationPlateService_1 = require("../services/RegistrationPlateService");
class RegistrationPlateController {
    constructor() {
        this.plateService = new RegistrationPlateService_1.RegistrationPlateService();
    }
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const plates = yield this.plateService.getAllPlates();
            res.json(plates);
        });
    }
    one(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const plate = yield this.plateService.getPlateByNumber(req.params.id);
            if (!plate)
                return res.status(404).send("Plate not found");
            res.json(plate);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.plateService.createPlate(req.body);
            res.status(201).json(result);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.plateService.updatePlate(req.params.id, req.body);
            if (!result)
                return res.status(404).send("Plate not found");
            res.json(result);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.plateService.deletePlate(req.params.id);
            res.json(result);
        });
    }
}
exports.RegistrationPlateController = RegistrationPlateController;
