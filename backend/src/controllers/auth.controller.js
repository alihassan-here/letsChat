import { createUser } from "../services/auth.service.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, password, picture, status } = req.body;
        const newUser = await createUser({
            name,
            email,
            password,
            picture,
            status
        });
    } catch (error) {
        next(error);
    }
}
export const login = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}
export const logout = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}
export const refreshToken = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}