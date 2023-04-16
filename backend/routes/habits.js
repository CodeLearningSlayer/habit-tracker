import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { addHabit, deleteHabit, getAllHabits } from "../controllers/HabitController.js";

const router = new Router();

router.post("/:id/habits/add:habitId", checkAuth, addHabit);
router.post("/:id/habits/delete:habitId", checkAuth, deleteHabit);
router.get("/allHabits", getAllHabits);


export default router