import {NextFunction, Request, Response, Router} from 'express';

import auth from "../middleware/auth";
import {isEmpty} from "class-validator";
import multer, {FileFilterCallback} from "multer";
import path from "path";

import {AppDataSource} from "../data-source";

import {makeId} from "../util/helpers";
import User from "../entities/User";
import Sub from "../entities/Sub";
import user from "../middleware/user";
import Post from "../entities/Post";


const createSub = async (req: Request, res: Response) => {
    const {name, title, description} = req.body;

    const user: User = res.locals.user;

    try {
        let errors: any = {};

        if (isEmpty(name)) errors.name = 'Name must not be empty';
        if (isEmpty(title)) errors.title = 'Title must not be empty';

        const sub = await AppDataSource
            .getRepository(Sub)
            .createQueryBuilder("sub")
            .where("lower(sub.name) = :name", {name: name.toLowerCase()})
            .getOne()

        if (sub) errors.name = 'Sub exists already';

        if (Object.keys(errors).length > 0) {
            throw errors;
        }

    } catch (err) {
        return res.status(400).json(err)
    }

    try {
        const sub = new Sub({name, description, title, user})
        await sub.save()

        return res.json(sub)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
}

const getSub = async (req: Request, res: Response) => {
    const name = req.params.name;

    try {
        const sub = await Sub.findOneOrFail({where: {name: name}})
        sub.posts = await Post.find({
            where: {
                sub: {id: sub.id},
            },
            order: {createdAt: 'DESC'},
            relations: ['comments', 'votes'],
        })

        if (res.locals.user) {
            sub.posts.forEach((p) => p.setUserVote(res.locals.user))
        }

        return res.json(sub)
    } catch (err) {
        console.log(err)
        return res.status(404).json({sub: 'Sub not found'})
    }

}

const ownSub = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;

    try {
        const sub = await Sub.findOneOrFail({where: {name: req.params.name}})

        if (sub.username !== user.username) {
            return res.status(403).json({error: 'You dont own this sub'})
        }

        res.locals.sub = sub;
        return next();
    } catch (err) {
        return res.status(500).json({error: 'Something went wrong'})
    }

}

const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/images',
        filename: (_, file, callback) => {
            const name = makeId(15);
            callback(null, name + path.extname(file.originalname)) // e.g. jshsuwq123 + .png
        }
    }),
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            callback(null, true)
        } else {
            callback(new Error('Not an image'))
        }
    }
})



// const uploadSubImage = async (req: Request, res: Response) => {
//     const subName = req.params.name;
//
//     try {
//         const sub = await Sub.findOneOrFail({where: {name: subName}})
//
//         const type = req.body.type;
//         if (type !== 'image' && type !== 'banner') {
//             return res.status(400).json({error: 'Invalid type'})
//         }
//
//         if (type === 'image') {
//             sub.imageUrn = req.body.imageUrn || null;
//         } else if (type === 'banner') {
//             sub.bannerUrn = req.body.bannerUrn || null;
//         }
//
//         await sub.save();
//
//         return res.json(sub);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({error: 'Something went wrong'});
//     }
// }

const uploadSubImage = async (_req: Request, res: Response) => {
    return res.json({success: 'true'})
}

const router = Router();

router.post('/', user, auth, createSub);
router.get('/:name', user, getSub);
router.post('/:name/image', user, auth, ownSub, upload.single('file'), uploadSubImage);

export default router;