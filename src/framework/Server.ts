import Container from "./Container/Container";
import AbstractRouter from "./Router/Contracts/RouterContract";
import { configDotenv } from "dotenv";
import { Express } from 'express';

class Server {
    constructor(app: Express, port: string) {
        configDotenv();
        this.start(app, port);
    }
    async start(app: Express, port: string) {
        // use API router
        // app.use('/api', new ApiRouter(this.container.get<Router>('router')).router);
        // // use web router
        // app.use('/', webRouter);
        // // use commands router
        // app.use('/commands', commandsRouter);

        app.listen(port, () => {
            console.log("[server]: Server is running at http://localhost:" + port);
        });
    }
}

export default Server;