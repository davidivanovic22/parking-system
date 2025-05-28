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
exports.ParkingZoneController = void 0;
const ParkingZoneService_1 = require("../services/ParkingZoneService");
class ParkingZoneController {
    constructor() {
        this.zoneService = new ParkingZoneService_1.ParkingZoneService();
    }
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const zones = yield this.zoneService.getAllZones();
            res.json(zones);
        });
    }
    one(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const zone = yield this.zoneService.getZoneById(+req.params.id);
            if (!zone)
                return res.status(404).send("Zone not found");
            res.json(zone);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.zoneService.createZone(req.body);
            res.status(201).json(result);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.zoneService.updateZone(+req.params.id, req.body);
            if (!result)
                return res.status(404).send("Zone not found");
            res.json(result);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.zoneService.deleteZone(+req.params.id);
            res.json(result);
        });
    }
}
exports.ParkingZoneController = ParkingZoneController;
