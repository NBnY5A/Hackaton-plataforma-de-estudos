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

export const findByUserId = async (userId, skip = 0, take = 10, completed = null) => {
    const where = { userId: Number(userId) };
    if (completed !== null) {
        where.completed = completed;
    }
    return await prisma.task.findMany({
        where,
        skip: Number(skip),
        take: Number(take),
        orderBy: { id: 'desc' }
    });
}
