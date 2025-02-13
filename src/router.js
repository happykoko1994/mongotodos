import { Router } from "express";
import tasksRouter from "./routes/todos/routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/tasks");
});

router.use("/tasks", tasksRouter);

export default router;
