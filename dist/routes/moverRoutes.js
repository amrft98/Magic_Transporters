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
const express_1 = __importDefault(require("express"));
const mover_1 = require("../controllers/mover");
const router = express_1.default.Router();
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mover_1.addMover)(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
    }
}));
//load items to mover ( items must be an array)
router.post('/:moverId/load', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mover_1.loadMover)(req, res);
    }
    catch (err) {
        res.status(500).json({ message: "server error" });
    }
}));
router.post('/:moverId/start-Mission', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mover_1.startMission)(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
    }
}));
router.post('/:moverId/end-Mission', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mover_1.endMission)(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
    }
}));
router.get("/topMovers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mover_1.topMovers)(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
    }
}));
exports.default = router;
