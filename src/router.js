import { Router } from "express";
import tasksRouter from "./routes/todos/routes.js";

const router = Router();
router.use("/tasks", tasksRouter);

export default router;