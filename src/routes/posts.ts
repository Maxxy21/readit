import {Request, Response, Router} from "express";

import auth from "../middleware/auth";
import User from "../entities/User";
import Post from "../entities/Post";
import Sub from "../entities/Sub";
import Comment from "../entities/Comment";
import user from "../middleware/user";

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
                relations: ['comments', 'votes', 'sub'],
            }
        )

        if (res.locals.user) {
            posts.forEach((p) => p.setUserVote(res.locals.user))
        }
        return res.json(posts)

    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
}

const getPost = async (req: Request, res: Response) => {
    const {identifier, slug} = req.params
    try {
        const post: Post = await Post.findOne(
            {
                where: {
                    identifier: identifier,
                    slug: slug,
                },
                order: {createdAt: 'DESC'},
                relations: ['sub', 'votes'],
            }
        )

        if (res.locals.user) {
            post.setUserVote(res.locals.user);
        }

        return res.json(post)

    } catch (err) {
        console.log(err)
        return res.status(404).json({error: 'Post not found'})
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

        return res.json(comment)

    } catch (err) {
        console.log(err)
        return res.status(404).json({error: 'Post not found'})
    }

}


const router = Router()
router.post('/', user, auth, createPost)
router.get('/', user, getPosts)
router.get('/:identifier/:slug', user, getPost)
router.post('/:identifier/:slug/comments', user, auth, commentOnPost)
export default router