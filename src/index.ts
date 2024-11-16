import express from "express";
import connectDB from "./config/db";
import env from "dotenv";
import moverRoutes from "./routes/moverRoutes";
import itemRoutes from "./routes/itemRoutes"
const app = express();
app.use(express.json());
env.config();

connectDB();

app.use("/api/movers", moverRoutes);
app.use("/api/item",itemRoutes);
const PORT=process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });