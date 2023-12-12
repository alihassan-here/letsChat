import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "dQ/!)N'~r^?5T8HSx2Uw`PSX(4p;tx#9=Z3HBM2swcV7q#BhaEDc~-@W3Z%?QLTAz<gm}@Ts#%]CR(Ukx{v~^'9yLaMK[*S;U{xq5$,m}7fJV?";

export default async (req, res, next) => {
    if (!req.headers["authorization"]) return next(createHttpError.Unauthorized());
    const bearerToken = req.headers["authorization"];
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error) next(createHttpError.Unauthorized());
        req.user = payload;
        next();
    });
}