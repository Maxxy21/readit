import {
    Entity as TOEntity,
    Column,
    ManyToOne, JoinColumn,
} from 'typeorm'
import Entity from "./Entity";
import User from "./User";
import Comment from "./Comment";
import Post from "./Post";

@TOEntity('votes')
export default class Vote extends Entity {
    constructor(vote?: Partial<Vote>) {
        super()
        Object.assign(this, vote)
    }

    @Column()
    value: number

    @ManyToOne(() => User)
    @JoinColumn({name: 'username', referencedColumnName: 'username'})
    user: User

    @Column()
    username: string

    @ManyToOne(() => Post)
    @JoinColumn({name: 'postId', referencedColumnName: 'id'})
    post: Post

    @Column({nullable: true})
    postId: number | null;

    @ManyToOne(() => Comment)
    @JoinColumn({name: 'commentId', referencedColumnName: 'id'})
    comment: Comment

    @Column({ nullable: true })
    commentId: number | null;
}