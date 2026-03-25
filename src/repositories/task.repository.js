import prisma from "../config/prisma.js";

export const create = async (task) => {
    return await prisma.task.create({ data: task });
}

export const findById = async (id) => {
    return await prisma.task.findUnique({ where: { id: Number(id) } });
}

export const update = async (id, task) => {
    return await prisma.task.update({ where: { id: Number(id) }, data: task });
}

export const deleteById = async (id) => {
    return await prisma.task.delete({ where: { id: Number(id) } });
}

export const findByUserId = async (userId) => {
    return await prisma.task.findMany({ where: { userId: Number(userId) } });
}
