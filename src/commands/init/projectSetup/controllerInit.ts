import { error } from "console";
import * as fs from "fs";
import path = require("path");



export default class ControllerInit {


    execute() { 
        const modelDir = path.resolve(process.cwd(), 'src/http/controllers');
        fs.mkdirSync(modelDir, { recursive: true });
        const filename = `controller.ts`;

        const modelTemplate = `import { response, Response, Router } from "express";
import Container from '../../../framework/container/container';

export interface ControllerInterface {
    sendResponse(response:Response, message:string, data: Array<any>, status:boolean): Response;
}


export class Controller implements ControllerInterface {

    protected router!: Router;
    protected container: Container;

    constructor(container: Container) {
        this.router = container.get<Router>("router");
        this.container = container;
    }


    sendResponse(response:Response, message: string, data: Array<any>, status: boolean): Response {
        return response.send({
            message: message,
            data: data,
            status: status
        });
    }

}
`;

        fs.writeFileSync(path.join(modelDir, filename), modelTemplate);
        console.log('Controller setup initialized');            
    }

}