import {Request, Response, NextFunction} from "express";

import User from "../entities/User";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token
        if (!token) throw new Error('Unauthenticated')
        const {username}: any = jwt.verify(token, process.env.JWT_SECRET!)
        const user = await User.findOne(
            {
                where: {
                    username: username
                }
            });
        if (!user) throw new Error('Unauthenticated')

        res.locals.user = user
        next()
    } catch (err) {
        console.log(err)
        res.status(401).json({error: 'Unauthenticated'})
    }
}