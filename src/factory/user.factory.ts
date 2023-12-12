import {Faker} from '@faker-js/faker';
import {setSeederFactory} from 'typeorm-extension';
import User from "../entities/User";

export const UsersFactory = setSeederFactory(User, (faker: Faker) => {
    const user = new User();
    user.email = faker.internet.email();
    user.username = faker.internet.userName();
    user.password = faker.internet.password();
    return user;
});
