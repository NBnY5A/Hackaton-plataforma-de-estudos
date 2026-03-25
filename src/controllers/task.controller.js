import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../services/task.service.js";
import { createTaskDTO, updateTaskDTO, responseTaskDTO } from "../dtos/task.dto.js";
import { ZodError } from "zod";

export const createTaskController = async (req, res) => {
    try {
        const data = createTaskDTO(req.body);
        const task = await createTask({ ...data, userId: req.userId });
        res.status(201).json(responseTaskDTO(task));
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ error: 'Invalid data', details: error.errors });
        }
        res.status(error.status || 500).json({ error: error.message });
    }
};

export const getTasksController = async (req, res) => {
    try {
        const tasks = await getTasks(req.userId);
        res.status(200).json(tasks.map(responseTaskDTO));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTaskByIdController = async (req, res) => {
    try {
        const task = await getTaskById(req.params.id);
        if (task.userId !== req.userId) {
            return res.status(403).json({ error: "Access denied" });
        }
        res.status(200).json(responseTaskDTO(task));
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

export const updateTaskController = async (req, res) => {
    try {
        const task = await updateTask(req.params.id, updateTaskDTO(req.body), req.userId);
        res.status(200).json(responseTaskDTO(task));
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ error: 'Invalid data', details: error.errors });
        }
        res.status(error.status || 500).json({ error: error.message });
    }
};

export const deleteTaskController = async (req, res) => {
    try {
        await deleteTask(req.params.id, req.userId);
        res.status(204).send();
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};
