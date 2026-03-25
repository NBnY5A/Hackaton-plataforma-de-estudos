import { createUser, deleteUser, updateUser, getUserById, getMe } from "../services/user.service.js";
import { createUserDTO, updateUserDTO, responseUserDTO } from "../dtos/user.dto.js";
import { ZodError } from "zod";

export const createUserController = async (req, res) => {
    try {
        const user = await createUser(createUserDTO(req.body));
        res.status(201).json(responseUserDTO(user));
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ error: 'Invalid data', details: error.errors });
        }
        res.status(error.status || 500).json({ error: error.message });
    }
}

export const deleteUserController = async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

export const updateUserController = async (req, res) => {
    try {
        const user = await updateUser(req.params.id, updateUserDTO(req.body));
        res.status(200).json(responseUserDTO(user));
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ error: 'Invalid data', details: error.errors });
        }
        res.status(error.status || 500).json({ error: error.message });
    }
}

export const getUserByIdController = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json(responseUserDTO(user));
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

export const getMeController = async (req, res) => {
    try {
        const user = await getMe(req.userId);
        res.status(200).json(responseUserDTO(user));
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}