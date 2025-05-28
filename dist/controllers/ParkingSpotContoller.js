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
exports.ParkingSpotController = void 0;
const ParkingSpotService_1 = require("../services/ParkingSpotService");
class ParkingSpotController {
    constructor() {
        this.parkingSpotService = new ParkingSpotService_1.ParkingSpotService();
    }
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const spots = yield this.parkingSpotService.getAllSpots();
            res.json(spots);
        });
    }
    one(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const spot = yield this.parkingSpotService.getSpotById(+req.params.id);
            if (!spot)
                return res.status(404).send("Spot not found");
            res.json(spot);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.parkingSpotService.createSpot(req.body);
            res.status(201).json(result);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.parkingSpotService.updateSpot(+req.params.id, req.body);
            if (!result)
                return res.status(404).send("Spot not found");
            res.json(result);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.parkingSpotService.deleteSpot(+req.params.id);
            res.json(result);
        });
    }
}
exports.ParkingSpotController = ParkingSpotController;
