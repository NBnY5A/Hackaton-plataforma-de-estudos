import { Router } from "express";
import { createTaskController, getTasksController, getTaskByIdController, updateTaskController, deleteTaskController } from "../controllers/task.controller.js";
import { authMiddleware } from "../config/auth-middleware.js";

const router = Router();

router.use(authMiddleware);
router.post('/tasks', createTaskController);
router.get('/tasks', getTasksController);
router.get('/tasks/:id', getTaskByIdController);
router.put('/tasks/:id', updateTaskController);
router.delete('/tasks/:id', deleteTaskController);

export default router;
