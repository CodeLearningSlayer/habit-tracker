import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { getAllUsers } from "./controllers/userController.js";
import router from "./routes/index.js";

dotenv.config()
const PORT = process.env.PORT || 3029; // вынести в .env
console.log(PORT);
mongoose.connect("mongodb://localhost:27017/Habit_tracker")
        .then(() => console.log("db connected"))
        .catch((err) => console.log("Error ocurred while connecting", err));
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router)

app.listen(PORT, function () {
    console.log("CORS-Enabled web server Listening on port 80");
})


app.get("/", (req, res) => getAllUsers(req, res));