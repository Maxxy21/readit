import {Faker} from '@faker-js/faker';
import {setSeederFactory} from 'typeorm-extension';
import Post from '../entities/Post';

export const PostsFactory = setSeederFactory(Post, (faker: Faker) => {
    const post = new Post();
    post.title = faker.lorem.sentence();
    post.body = faker.lorem.paragraphs();
    post.slug = faker.lorem.slug();
    return post;
});
