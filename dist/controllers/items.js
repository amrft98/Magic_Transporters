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
exports.addItem = void 0;
const MagicItem_1 = __importDefault(require("../models/MagicItem"));
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, weight } = req.body;
        if (!name || !weight) {
            return res.status(400).json({ message: 'Name and weight are required.' });
        }
        const newItem = yield MagicItem_1.default.create({
            name,
            weight,
        });
        return res.status(201).json({
            message: 'Magic Item added successfully.',
            item: newItem
        });
    }
    catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ message: 'error while adding item.', error });
    }
});
exports.addItem = addItem;
