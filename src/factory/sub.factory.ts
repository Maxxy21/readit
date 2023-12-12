import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import Sub from '../entities/Sub';

export const SubsFactory = setSeederFactory(Sub, (faker: Faker) => {
    const sub = new Sub();
    sub.name = faker.lorem.word();
    sub.title = faker.lorem.sentence();
    sub.description = faker.lorem.paragraph();
    return sub;
});
