import {Router} from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { changeDayStatus, createDayRecord, getMonth } from "../controllers/DateController.js";
const router = new Router();

router.get("/:userId/:monthName", getMonth);
router.post("/:userId/:month/days/add", createDayRecord);
router.patch("/:userId/:month/:dayTime/update", changeDayStatus)

export default router;