import createHttpError from "http-errors";
import { createUser, signUser } from "../services/auth.service.js";
import { generateToken, verifyToken } from "../services/token.service.js";
import { findUser } from "../services/user.service.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "dQ/!)N'~r^?5T8HSx2Uw`PSX(4p;tx#9=Z3HBM2swcV7q#BhaEDc~-@W3Z%?QLTAz<gm}@Ts#%]CR(Ukx{v~^'9yLaMK[*S;U{xq5$,m}7fJV?";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "g-eZmPjSV^(*Bf#.%cv3[pGBnhrE}fj5tv_,z;u>DK8[BuS&2HbYWk#g,Z;`!R<4:Jua;7bg)/*svdr.+ez]S(EwP$8u@/=,%X}mGe.q[;*LN(";
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
        const accessToken = await generateToken({ userId: newUser._id }, "1d", ACCESS_TOKEN_SECRET);
        const refreshToken = await generateToken({ userId: newUser._id }, "30d", REFRESH_TOKEN_SECRET);
        res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            path: "/api/v1/auth/refreshtoken",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({
            message: "register successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                status: newUser.status,
                token: accessToken,
            }
        });

    } catch (error) {
        next(error);
    }
}
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await signUser(email, password);
        const accessToken = await generateToken({ userId: user._id }, "1d", ACCESS_TOKEN_SECRET);
        const refreshToken = await generateToken({ userId: user._id }, "30d", REFRESH_TOKEN_SECRET);
        res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            path: "/api/v1/auth/refreshtoken",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
                token: accessToken,
            }
        });
    } catch (error) {
        next(error);
    }
}
export const logout = async (req, res, next) => {
    try {
        res.clearCookie("refreshtoken", { path: "/api/v1/auth/refreshtoken" });
        res.json({
            message: "logged out successfully!"
        })
    } catch (error) {
        next(error);
    }
}
export const refreshToken = async (req, res, next) => {
    try {
        const refresh_token = req.cookies.refreshtoken;
        console.log(refresh_token);
        if (!refresh_token) throw createHttpError.Unauthorized("Please login.");
        const check = await verifyToken(refresh_token, REFRESH_TOKEN_SECRET);
        const user = await findUser(check.userId);
        const accessToken = await generateToken({ userId: user._id }, "1d", ACCESS_TOKEN_SECRET);
        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
                token: accessToken,
            }
        });
    } catch (error) {
        next(error);
    }
}