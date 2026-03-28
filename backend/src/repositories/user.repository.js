import prisma from "../config/prisma.js";

export const createUser = async (user) => {
    return await prisma.user.create({ data: user, select: { id: true, name: true, email: true } });
}

export const findByEmail = async (email) => {
    return await prisma.user.findUnique({ where: { email } });
}

export const deleteById = async (id) => {
    return await prisma.user.delete({ where: { id: Number(id) }, select: { id: true, name: true, email: true } });
}

export const updateUser = async (id, user) => {
    return await prisma.user.update({ where: { id: Number(id) }, data: user, select: { id: true, name: true, email: true } });
}

export const findById = async (id) => {
    return await prisma.user.findUnique({ where: { id: Number(id) }, select: { id: true, name: true, email: true } });
}