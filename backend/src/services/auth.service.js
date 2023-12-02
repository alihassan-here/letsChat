import createHttpError from "http-errors";
import validator from "validator";
import UserModel from "../models/userModel.js";
export const createUser = async (userData) => {
    const { name, email, password, picture, status } = userData;

    //check if fields are empty
    if (!name || !email || !password) {
        throw createHttpError.BadRequest("Please fill all the required fields.")
    }

    //check name length
    if (!validator.isLength(name, { min: 2, max: 16 })) {
        throw createHttpError.BadRequest("Please make sure your name is between 2 and 16 characters.");
    }
    //check status length
    if (status && status.length > 64) {
        throw createHttpError.BadRequest("Please make sure your status is less than 64 characters");
    }
    //check if email address is valid
    if (!validator.isEmail(email)) {
        throw createHttpError.BadRequest("Please make sure to provide valid email address.");
    }
    //check if user already exists
    const checkDB = await UserModel.findOne({ email });
    if (checkDB) {
        throw createHttpError.Conflict("Please try again with a different email address, this email already exists.");
    }
    //check password length
    if (!validator.isLength(password, { min: 6, max: 128 })) {
        throw createHttpError.BadRequest("Please make sure your password is between 6 and 128 characters long.");
    }

    //hash password --> to be done in the user model

    const user = await new UserModel({
        name,
        email,
        picture,
        status,
        password
    }).save();
    return user;
}