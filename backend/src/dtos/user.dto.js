import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js";

export const createUserDTO = (data) => {
    return createUserSchema.parse(data);
}

export const updateUserDTO = (data) => {
    return updateUserSchema.parse(data);
}

export const responseUserDTO = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email
    }
}

