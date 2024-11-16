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
exports.topMovers = exports.endMission = exports.startMission = exports.loadMover = exports.addMover = void 0;
const MagicMover_1 = __importDefault(require("../models/MagicMover"));
const MagicItem_1 = __importDefault(require("../models/MagicItem"));
const MissionLogger_1 = __importDefault(require("../models/MissionLogger"));
const addMover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, weightLimit } = req.body;
        if (!name || !weightLimit) {
            return res.status(400).json({ message: 'Name and weightLimit are required.' });
        }
        const newMover = yield MagicMover_1.default.create({
            name,
            weightLimit,
            questState: 'resting',
        });
        return res.status(201).json({
            message: 'Magic mover added successfully.',
            mover: newMover,
        });
    }
    catch (err) {
        return res.status(500).json({ message: 'error while adding mover.', err });
    }
});
exports.addMover = addMover;
const loadMover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { moverId } = req.params;
        const { itemIds } = req.body; //must be an array
        if (itemIds.length === 0 || !Array.isArray(itemIds)) {
            return res.status(400).json({ message: "itemIds must be existing. " });
        }
        const mover = yield MagicMover_1.default.findById(moverId).populate('loadedItems');
        if (!mover) {
            return res.status(404).json({ message: "mover not found !." });
        }
        if (mover.questState === "on-mission") {
            return res.status(400).json({ message: `cannot load items while mover status is ${mover.questState}` });
        }
        const items = yield MagicItem_1.default.find({ _id: { $in: itemIds } });
        if (items.length !== itemIds.length) {
            return res.status(404).json({ message: "One or more Magic Items not found." });
        }
        const currentWeight = mover.loadedItems && mover.loadedItems.length > 0
            ? mover.loadedItems.reduce((total, item) => total + Number(item.weight), 0)
            : 0;
        const newItemsWeight = items.reduce((total, item) => total + Number(item.weight), 0);
        if (currentWeight + newItemsWeight > mover.weightLimit) {
            return res.status(400).json({ message: 'Loading these items would exceed the mover\'s weight limit.' });
        }
        if (mover.questState === "resting") {
            yield MagicMover_1.default.updateOne({ _id: mover._id }, { $set: { questState: "loading" } });
        }
        const mission = yield MissionLogger_1.default.create({
            moverId: mover._id,
            action: "loading",
        });
        const updateMover = yield MagicMover_1.default.findOneAndUpdate({ _id: mover._id }, { $push: { loadedItems: { $each: items.map(item => item._id) } } }, { new: true });
        return res.status(200).json({ message: "Items loaded successfully.", updateMover });
    }
    catch (err) {
        return res.status(500).json({ message: "Server error while loading mover." });
    }
});
exports.loadMover = loadMover;
const startMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { moverId } = req.params;
        const mover = yield MagicMover_1.default.findById(moverId);
        if (!mover) {
            return res.status(404).json({ message: "mover not found !." });
        }
        const updateMover = yield MagicMover_1.default.findOneAndUpdate({ _id: mover._id }, { $set: { questState: "on-mission" } }, { new: true });
        if (mover.questState !== 'loading') {
            return res.status(400).json({ message: `Cannot start mission while mover is in ${mover.questState} state.` });
        }
        yield MissionLogger_1.default.create({
            moverId: mover._id,
            action: "on-mission",
        });
        return res.status(200).json({ message: 'Mission started successfully.', updateMover });
    }
    catch (err) {
        return res.status(500).json({ message: "Server error while start the misssion.", err });
    }
});
exports.startMission = startMission;
const endMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { moverId } = req.params;
        const mover = yield MagicMover_1.default.findById(moverId);
        if (!mover) {
            return res.status(404).json({ message: "mover not found !." });
        }
        if (mover.questState !== 'on-mission') {
            return res.status(400).json({ message: `Cannot end mission while mover is in ${mover.questState} state.` });
        }
        const moveritems = mover.loadedItems.map((e) => e._id);
        const updateMover = yield MagicMover_1.default.findOneAndUpdate({ _id: mover._id }, {
            $pull: { loadedItems: { $in: moveritems } },
            $set: {
                questState: "resting",
                missionsCompleted: mover.missionsCompleted + 1
            }
        }, { new: true });
        yield MissionLogger_1.default.create({
            moverId: mover._id,
            action: "resting",
        });
        return res.status(200).json({ message: 'Mission ended successfully.', updateMover });
        ;
    }
    catch (err) {
        return res.status(500).json({ message: "Server error while end the mission.", err });
    }
});
exports.endMission = endMission;
const topMovers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topMovers = yield MagicMover_1.default.find().sort({ missionsCompleted: -1 })
            .select("_id name missionsCompleted weightLimit")
            .exec();
        return res.status(200).json({ topMovers });
    }
    catch (err) {
        return res.status(500);
    }
});
exports.topMovers = topMovers;
