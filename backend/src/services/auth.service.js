import 'dotenv/config';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findByEmail, createUser } from "./user.service.js";

export const login = async (email, password) => {
    const user = await findByEmail(email);
    if (!user) {
        throw new Error("Usuário ou senha inválida");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Usuário ou senha inválida");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return token;
};

export const register = async (name, email, password) => {
    const user = await findByEmail(email);
    if (user) {
        throw new Error("Usuário já cadastrado");
    }
    return await createUser({ name, email, password });
};

