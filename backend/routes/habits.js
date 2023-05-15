import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { addHabit, deleteHabit, getAllHabits, setHabitCompleted } from "../controllers/HabitController.js";

const router = new Router();

router.post("/:id/habits/add", checkAuth, addHabit);
router.post("/:id/habits/delete/:habitId", checkAuth, deleteHabit);
router.get("/:id/allHabits", getAllHabits);
router.post("/:id/habits/update/:habitId", checkAuth, setHabitCompleted);

export default router