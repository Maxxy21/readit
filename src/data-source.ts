import "reflect-metadata";
import {DataSource, DataSourceOptions} from 'typeorm';
import {SeederOptions} from 'typeorm-extension';
import dotenv from "dotenv";

dotenv.config()

// Define options for DataSource and Seeder
const options: DataSourceOptions & SeederOptions = {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],

    seeds: ['src/seeds/**/*{.ts,.js}'],
    factories: ['src/factories/**/*{.ts,.js}']
};

export const AppDataSource = new DataSource(options);
