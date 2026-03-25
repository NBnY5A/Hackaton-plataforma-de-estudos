import { create, findById, update, deleteById, findByUserId } from "../repositories/task.repository.js";
import { findById as findUserById } from "../repositories/user.repository.js";

export const createTask = async (task) => {
    const userExists = await findUserById(task.userId);
    if (!userExists) {
        throw new Error("User not found");
    }
    return await create(task);
};

export const getTasks = async (userId, page = 1, limit = 10, completed = null) => {
    if (!userId) {
        throw new Error("UserId is required");
    }
    const skip = (page - 1) * limit;
    return await findByUserId(userId, skip, limit, completed);
};

export const getTaskById = async (id) => {
    const task = await findById(id);
    if (!task) {
        throw new Error("Task not found");
    }
    return task;
};

export const updateTask = async (id, task, userId) => {
    const taskExists = await findById(id);
    if (!taskExists) {
        throw new Error("Task not found");
    }
    if (taskExists.userId !== userId) {
        throw new Error("Access denied");
    }

    const updatedData = { ...task };

    if (task.completed === true && !taskExists.completed) {
        updatedData.completedAt = new Date();
    } else if (task.completed === false) {
        updatedData.completedAt = null;
    }

    return await update(id, updatedData);
};

export const deleteTask = async (id, userId) => {
    const taskExists = await findById(id);
    if (!taskExists) {
        throw new Error("Task not found");
    }
    if (taskExists.userId !== userId) {
        throw new Error("Access denied");
    }
    return await deleteById(id);
};
