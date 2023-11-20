import {Request, Response, Router} from "express";

import User from "../entities/User";
import auth from "../middleware/auth";
import router from "./auth";
import Post from "../entities/Post";

const createPost = async (req: Request, res: Response) => {
    const {title, body, sub} = req.body

    const user: User = res.locals.user

    if (title.trim() === '') {
        res.status(400).json({title: 'Title must not be empty'})
    }

    try {
        //TODO: find sub
        const post = new Post({title, body, user, subName: sub})
    }
}


const router = Router()
router.post('/', auth, createPost)

export default router