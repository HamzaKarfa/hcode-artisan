
import Command from "./contracts/command";
import { Command as Commander } from 'commander';
import * as fs from 'fs';
import * as path from 'path';

export class MakeController extends Command {
    constructor(command: Commander) {
        super(command, 'make:controller <name>', 'Créer un nouveau controller');
    }

    async run(args:any) {
        const name = args;
        this.generateController(name);
    }

    
    generateController(name: string) {
        const modelDir = path.resolve(process.cwd(), 'src/http/controllers');
        const modelName = `${name}Controller.ts`;
    
        if (!fs.existsSync(modelDir)) {
        fs.mkdirSync(modelDir, { recursive: true });
        }
    
        const modelTemplate = `
        import { Request, Response } from "express";
        import {Controller} from "./controller";

        export class ${name}Controller extends Controller {
            index(req: Request, res: Response) {
                return res.send('Hello World');
            }
            store(req: Request, res: Response) {
                const inputs = req.body;
                ${name}.create(inputs);
                return res.send('Hello World');
            }
            update(req: Request, res: Response) {
                const inputs = req.body;
                ${name}.update(inputs);
                return res.send('Hello World');
            }
            show(req: Request, res: Response) {
                const input = req.params.id;
                ${name}.find(input);
                return res.send('Hello World');
            }
            destroy(req: Request, res: Response) {
                const input = req.params.id;
                ${name}.delete(input);
                return res.send('Hello World');
            }
        }
        `;
    
        fs.writeFileSync(path.join(modelDir, modelName), modelTemplate);
        console.log(`Controller ${modelName}Controller créé avec succès !`);
    }
}
