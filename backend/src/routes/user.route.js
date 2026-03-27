import { Router } from "express";
import { createUserController, deleteUserController, updateUserController, getUserByIdController, getMeController } from "../controllers/user.controller.js";
import { authMiddleware } from "../config/auth-middleware.js";

const router = Router();

router.post('/users', createUserController);

router.use(authMiddleware);
router.get('/me', getMeController);
router.get('/users/:id', getUserByIdController);
router.delete('/users/:id', deleteUserController);
router.put('/users/:id', updateUserController);

export default router;  