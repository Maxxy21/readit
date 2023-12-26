import {Router, Request, Response} from 'express';

import User from "../entities/User";
import Post from "../entities/Post";
import Vote from "../entities/Vote";
import Comment from "../entities/Comment";

import auth from "./../middleware/auth";
import user from "../middleware/user";
import Sub from "../entities/Sub";
import {AppDataSource} from "../data-source";

const vote = async (req: Request, res: Response) => {
    const {identifier, slug, commentIdentifier, value} = req.body

    if (![-1, 0, 1].includes(value)) {
        return res.status(400).json({value: 'Value must be -1, 0 or 1'})
    }

    try {
        const user: User = res.locals.user
        let post = await Post.findOneOrFail(
            {
                where: {
                    identifier: identifier,
                    slug: slug
                }
            })
        let vote: Vote | undefined
        let comment: Comment | undefined

        if (commentIdentifier) {
            comment = await Comment.findOneOrFail({where: {identifier: commentIdentifier}})
            vote = await Vote.findOne({where: {username: user.username, commentId: comment.id}});
        } else {
            vote = await Vote.findOne({where: {username: user.username, postId: post.id}});
        }

        if (!vote && value === 0) {
            // if no vote and value = 0 return error
            return res.status(404).json({error: 'Vote not found'})
        } else if (!vote) {
            // if no vote create it
            vote = new Vote({user, value})
            if (comment) vote.comment = comment
            else vote.post = post
            await vote.save()
        } else if (value === 0) {
            // if vote exists and value = 0 remove vote from DB
            await vote.remove()
        } else if (vote.value !== value) {
            vote.value = value
            await vote.save()
        }

        post = await Post.findOneOrFail(
            {
                where: {
                    identifier: identifier,
                    slug: slug
                },
                relations: ['comments', 'comments.votes', 'sub', 'votes']
            })

        post.setUserVote(user)
        post.comments.forEach((c) => c.setUserVote(user))

        return res.json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
}

const topSubs = async (_: Request, res: Response) => {
    try {
        /**
         * SELECT s.title, s.name,
         * COALESCE('http://localhost:5000/images/' || s."imageUrn" , 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y') as imageUrl,
         * count(p.id) as "postCount"
         * FROM subs s
         * LEFT JOIN posts p ON s.name = p."subName"
         * GROUP BY s.title, s.name, imageUrl
         * ORDER BY "postCount" DESC
         * LIMIT 5;
         */
        const imageUrlExp = `COALESCE('${process.env.APP_URL}/images/' || s."imageUrn" , 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y')`
        const subs = await AppDataSource.getRepository(Sub)
            .createQueryBuilder()
            .select(
                `s.title, s.name, ${imageUrlExp} as "imageUrl", count(p.id) as "postCount"`
            )
            .from(Sub, 's')
            .leftJoin(Post, 'p', `s.name = p."subName"`)
            .groupBy('s.title, s.name, "imageUrl"')
            .orderBy(`"postCount"`, 'DESC')
            .limit(5)
            .execute()

        return res.json(subs)
    } catch (err) {
        return res.status(500).json({error: 'Something went wrong'})
    }
}

const router = Router()

router.post('/vote', user, auth, vote)
router.get('/top-subs', topSubs)
export default router