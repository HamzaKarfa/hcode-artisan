import * as fs from "fs";
import path = require("path");


export default class ServerInit {


    execute() { 
        const modelDir = path.resolve(process.cwd(), 'framework/');
        fs.mkdirSync(modelDir, { recursive: true }); // Créer le répertoire, y compris les dossiers parents si nécessaire
        const filename = `server.ts`;

        const modelTemplate = `import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import Container from "./serviceContainer/container";
import { autoRegister } from "./serviceContainer/autoRegister";
import apiRouter from "../src/routes/api";
import ApiRouter from "../src/routes/api";

class Server {

    private container!: Container;

    constructor() {
        dotenv.config();
        this.initServiceContainer();
        this.start();
    }

    async start() {
        const port = process.env.APP_PORT || 3000;
        const app = this.container.get<Express>("express");
        // use API router
        app.use('/api', new ApiRouter(this.container.get<Router>('router')).router);
        // // use web router
        // app.use('/', webRouter);
        // // use commands router
        // app.use('/commands', commandsRouter);

        app.listen(port, () => {
            console.log("[server]: Server is running at http://localhost:" + port);
        });
    }

    async initServiceContainer() {
        this.container = Container.getInstance();
        this.container.bind("express").toConstantValue(express());
        this.container.bind("port").to(process.env.APP_PORT || '3000');
        this.container.bind("router").to(express.Router());
        await autoRegister(this.container,'\\http\\controllers');
        console.log('Service container initialized');
    }

}

export default Server;`;

        fs.writeFileSync(path.join(modelDir, filename), modelTemplate);
        console.log('Database setup initialized');            
    }

}