import { create, findById, update, deleteById, findByUserId } from "../repositories/task.repository.js";
import { findById as findUserById } from "../repositories/user.repository.js";

export const createTask = async (task) => {
    const userExists = await findUserById(task.userId);
    if (!userExists) {
        throw new Error("User not found");
    }
    return await create(task);
};

export const getTasks = async (userId) => {
    if (!userId) {
        throw new Error("UserId is required");
    }
    return await findByUserId(userId);
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
    return await update(id, task);
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
