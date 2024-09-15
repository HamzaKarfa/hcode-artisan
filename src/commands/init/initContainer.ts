import * as fs from 'fs';
import * as path from 'path';


export default class InitContainer {
    execute() {
        const modelDir = path.resolve(process.cwd(), 'framework/container/');
        fs.mkdirSync(modelDir, { recursive: true }); // Créer le répertoire, y compris les dossiers parents si nécessaire
        const filename = `container.ts`;
        const fullPath = "${fullPath}";
        const modelTemplate = `import {glob} from 'glob';
import path from 'path';
import { Express } from "express-serve-static-core";

export async function autoRegister(container: Container, directory: string): Promise<void> {
    const fullPath = path.join(__dirname, "..",directory)
    const files = glob.sync(\`${fullPath}/**/*.ts\`);

    files.forEach((file: string) => {
        const modulePath = path.resolve(file);
        const module = require(modulePath);

        Object.keys(module).forEach(key => {
            const Class = module[key];
            if (typeof Class === 'function') {
                const instance = new Class(container);
                container.bind(key).to(instance);
            }
        });
    });
}


export default class Container {
    private static instance: Container;
    private services: Map<string, unknown> = new Map();
    
    private constructor() {}


    public static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }


    public register<T>(name: string, service: T): void {
        this.services.set(name, service);
    }

    public get<T>(name: string): T {
        const service = this.services.get(name);
        if (!service) {
            throw new Error("Service not found:" + name);
        }
        return service as T;
    }

    public bind<T>(name: string): ServiceBinding<T> {
        return new ServiceBinding<T>(this, name);
    }

}


export class ServiceBinding<T> {
  
    private container: Container;
    private name: string;
    constructor(container: Container, name: string) {
        this.container = container;
        this.name = name;
    }

    public to(service: any) {
        this.container.register(this.name, service);
    }

    public get() {
        return this.container.get(this.name);
    }
    toConstantValue(arg0: Express) {
        this.container.register(this.name, arg0);
    }
}
`;
        fs.writeFileSync(path.join(modelDir, filename), modelTemplate);
        console.log('Container setup initialized');
    }
}