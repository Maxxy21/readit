import "reflect-metadata";
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

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

// Create AppDataSource instance
export const AppDataSource = new DataSource(options);

// Initialize AppDataSource and run seeders
(async () => {
    try {
        await AppDataSource.initialize();
        await runSeeders(AppDataSource);
        console.log("Data Source has been initialized and seeders have been run!");
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
    }
})();


// const options: DataSourceOptions & SeederOptions = {
//     type: process.env.DB_TYPE as any,
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     synchronize: true,
//     logging: false,
//     entities: ["src/entities/**/*.ts"],
//     migrations: ["src/migrations/**/*.ts"],
//     subscribers: ["src/subscriber/**/*.ts"],
//
//     seeds: ['src/seeds/**/*{.ts,.js}'],
//     factories: ['src/factories/**/*{.ts,.js}']
// };
//
// export const AppDataSource = new DataSource(options);
