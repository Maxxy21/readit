import {AppDataSource} from "../data-source";
import {runSeeders} from "typeorm-extension";

AppDataSource.initialize().then(async () => {
        await runSeeders(AppDataSource)
        console.log("Seeders finished")
        process.exit()
    }
).catch(error => console.log(error))