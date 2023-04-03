import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {getAllUsers, seeder} from "./controllers/UserController.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";

dotenv.config()
const PORT = process.env.PORT || 3029; // вынести в .env
console.log(PORT);
mongoose.connect("mongodb://localhost:27017/Habit_tracker")
        .then(() => console.log("db connected"))
        .catch((err) => console.log("Error ocurred", err));
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

app.listen(PORT, function () {
    console.log("CORS-Enabled web server Listening on port 80");
})

// seeder();

app.get("/", (req, res) => getAllUsers(req, res));