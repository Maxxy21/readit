import "reflect-metadata"
import express from "express"
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import {AppDataSource} from "./data-source"

dotenv.config()


import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts";
import subRoutes from "./routes/subs";
import miscRoutes from "./routes/misc";

import trim from "./middleware/trim";


const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(morgan("dev"))
app.use(trim)
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
}))


app.use(express.static("public"))

app.get('/', (_, res) => res.send('Hello World'))

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/subs", subRoutes);
app.use("/api/misc", miscRoutes);

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`)

    try {
        await AppDataSource.initialize();
        console.log("Database connected")
    } catch (error) {
        console.log(error)
    }
})


// AppDataSource.initialize().then(async () => {
//
//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)
//
//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)
//
//     console.log("Here you can setup and run express / fastify / any other framework.")
//
// }).catch(error => console.log(error))
