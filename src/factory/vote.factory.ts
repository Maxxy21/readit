import {Faker} from '@faker-js/faker';
import {setSeederFactory} from 'typeorm-extension';
import Vote from '../entities/Vote';

export const VotesFactory = setSeederFactory(Vote, (faker: Faker) => {
    const vote = new Vote();
    vote.value = faker.number.int({min: -1, max: 1});
    return vote;
});
