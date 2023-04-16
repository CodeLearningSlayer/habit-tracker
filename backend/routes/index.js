import authRoute from "./auth.js";
import userRoute from "./user.js";
import habitRoute from "./habits.js";
import { Router } from "express";

const router = new Router()

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/habits', habitRoute);

export default router