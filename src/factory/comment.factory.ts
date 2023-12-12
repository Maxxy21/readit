import {Faker} from '@faker-js/faker';
import {setSeederFactory} from 'typeorm-extension';
import Comment from '../entities/Comment';

export const CommentsFactory = setSeederFactory(Comment, (faker: Faker) => {
    const comment = new Comment();
    comment.body = faker.lorem.sentences();
    return comment;
});
