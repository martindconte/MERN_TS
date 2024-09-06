import { envs } from "./config/envs";
import { MongoDB } from "./data";
import { AppRoutes } from "./presentation/routes/app.routes";
import { Server } from "./presentation/server";

(() => {
    main();
})();

async function main() {

    //* Data Base
    await MongoDB.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,

    })

    //* server
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes
    })
    server.start()
}