import {NextFunction, Request, Response} from "express";

import User from "../entities/User";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token
        if (!token) return next()
        const {username}: any = jwt.verify(token, process.env.JWT_SECRET!)
        res.locals.user = await User.findOne(
            {
                where: {
                    username: username
                }
            })
        return next()
    } catch (err) {
        console.log(err)
        return res.status(401).json({error: 'Unauthenticated'})
    }
}