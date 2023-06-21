import {Router} from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createDayRecord, getMonth } from "../controllers/DateController.js";
const router = new Router();

router.get("/:userId/:monthName", getMonth);
router.post("/:userId/:month/days/add", createDayRecord);


export default router;