import {Router} from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { getMonth } from "../controllers/DateController.js";
const router = new Router();

router.get("/:userId/:month", checkAuth, getMonth);
router.post("/:userId/:month/:day", checkAuth);


export default router;