import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";

export const createTaskDTO = (data) => {
    return createTaskSchema.parse(data);
}

export const updateTaskDTO = (data) => {
    return updateTaskSchema.parse(data);
}

export const responseTaskDTO = (task) => {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        completedAt: task.completedAt,
        category: task.category,
        userId: task.userId
    }
}
