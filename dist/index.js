"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const moverRoutes_1 = __importDefault(require("./routes/moverRoutes"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
(0, db_1.default)();
app.use("/api/movers", moverRoutes_1.default);
app.use("/api/item", itemRoutes_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
