import {Router} from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { changeDayStatus, createDayRecordIfNotCreated, getMonth } from "../controllers/DateController.js";
const router = new Router();

router.get("/:userId/:monthName", getMonth);
router.post("/:userId/:month/days/add", createDayRecordIfNotCreated);
router.patch("/:userId/:month/:dayTime/update", changeDayStatus)

export default router;