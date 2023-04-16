import { Router } from "express";
import { getAllUsers } from "../controllers/UserController.js";

const router = new Router();

router.get("/allUsers", getAllUsers);

// router.get("/:id", getById);

export default router