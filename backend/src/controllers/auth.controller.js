import { createUser } from "../services/auth.service.js";
import { generateToken } from "../services/token.service.js";

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
        const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "dQ/!)N'~r^?5T8HSx2Uw`PSX(4p;tx#9=Z3HBM2swcV7q#BhaEDc~-@W3Z%?QLTAz<gm}@Ts#%]CR(Ukx{v~^'9yLaMK[*S;U{xq5$,m}7fJV?";
        const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "g-eZmPjSV^(*Bf#.%cv3[pGBnhrE}fj5tv_,z;u>DK8[BuS&2HbYWk#g,Z;`!R<4:Jua;7bg)/*svdr.+ez]S(EwP$8u@/=,%X}mGe.q[;*LN(";
        const accessToken = await generateToken({ userId: newUser._id }, "1d", ACCESS_TOKEN_SECRET);
        const refreshToken = await generateToken({ userId: newUser._id }, "30d", REFRESH_TOKEN_SECRET);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/api/v1/auth/refreshToken",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({
            message: "register successfully",
            access_token: accessToken,
            user: {
                _id: userUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                status: newUser.status
            }
        })

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