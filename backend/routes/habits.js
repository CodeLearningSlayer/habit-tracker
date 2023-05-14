import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { addHabit, deleteHabit, getAllHabits } from "../controllers/HabitController.js";

const router = new Router();

router.post("/:id/habits/add", checkAuth, addHabit);
router.post("/:id/habits/delete/:habitId", checkAuth, deleteHabit);
router.get("/:id/allHabits", getAllHabits);


export default router