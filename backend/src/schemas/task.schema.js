import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    category: z.string().min(1),
});

export const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    category: z.string().min(1).optional()
});
