import { createUser as create, findByEmail, deleteById, updateUser as update, findById } from "../repositories/user.repository.js";
export { findByEmail };
import bcrypt from "bcrypt";


export const createUser = async (user) => {
    const { name, email, password } = user;

    const userExists = await findByEmail(email);
    if (userExists) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await create({ name, email, password: hashedPassword });
};

export const deleteUser = async (id) => {
    const userExists = await findById(id);
    if (!userExists) {
        throw new Error("User not found");
    }
    return await deleteById(id);
};

export const updateUser = async (id, user) => {
    const userExists = await findById(id);

    if (!userExists) {
        throw new Error("User not found");
    }

    let updatedData = { ...user };

    if (user.password) {
        updatedData.password = await bcrypt.hash(user.password, 10);
    }

    if (user.email && user.email !== userExists.email) {
        const emailExists = await findByEmail(user.email);

        if (emailExists) {
            throw new Error("Email already in use");
        }
    }

    return await update(id, updatedData);
};

export const getUserById = async (id) => {
    const user = await findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

export const getMe = async (id) => {
    const user = await findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};