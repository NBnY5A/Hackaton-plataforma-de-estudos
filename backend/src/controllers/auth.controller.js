import { login, register } from "../services/auth.service.js";
import { responseUserDTO } from "../dtos/user.dto.js";

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await login(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await register(name, email, password);
        res.status(201).json(responseUserDTO(user));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
