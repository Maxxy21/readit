import {Request, Response, Router} from "express";

import auth from "../middleware/auth";
import User from "../entities/User";
import Post from "../entities/Post";
import Sub from "../entities/Sub";
import Comment from "../entities/Comment";

const createPost = async (req: Request, res: Response) => {
    const {title, body, sub} = req.body

    const user: User = res.locals.user

    if (title.trim() === '') {
        res.status(400).json({title: 'Title must not be empty'})
    }

    try {
        //find sub

        const subRecord = await Sub.findOneOrFail({
            where:
                {
                    name: sub
                }
        })

        const post = new Post({title, body, user, sub: subRecord})
        await post.save()

        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Something went wrong'})
    }
}

const getPosts = async (_: Request, res: Response) => {
    try {
        const posts = await Post.find(
            {
                order: {createdAt: 'DESC'},
            }
        )

        res.json(posts)

    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Something went wrong'})
    }
}

const getPost = async (req: Request, res: Response) => {
    const {identifier, slug} = req.params
    try {
        const post = await Post.find(
            {
                where: {
                    identifier: identifier,
                    slug: slug,
                },
                order: {createdAt: 'DESC'},
                relations: ['sub'],
            }
        )

        res.json(post)

    } catch (err) {
        console.log(err)
        res.status(404).json({error: 'Post not found'})
    }
}

const commentOnPost = async (req: Request, res: Response) => {
    const {identifier, slug} = req.params
    const body = req.body.body

    try {
        const post = await Post.findOneOrFail(
            {
                where: {
                    identifier: identifier,
                    slug: slug,
                },
            }
        )

        const comment = new Comment({
            body,
            user: res.locals.user,
            post,
        })

        await comment.save()

        res.json(comment)

    } catch (err) {
        console.log(err)
        res.status(404).json({error: 'Post not found'})
    }

}


const router = Router()
router.post('/', auth, createPost)
router.get('/', getPosts)
router.get('/:identifier/:slug', getPost)
router.post('/:identifier/:slug/comments', auth, commentOnPost)
export default router