import * as fs from 'fs';
import * as path from 'path';
import ControllerInit from './projectSetup/controllerInit';
import RouterInit from './projectSetup/routerInit';
import ServerInit from './projectSetup/serverInit';


export default class InitFileProject {
    execute() {
        new ServerInit().execute();

        const publicDir = path.resolve(process.cwd(), 'src/public');
        fs.mkdirSync(publicDir, { recursive: true }); // Créer le répertoire, y compris les dossiers parents si nécessaire
        const filename = `index.ts`;

        const publicTemplate = `import Server from "../../framework/server";
const server = new Server();`;
        
        fs.writeFileSync(path.join(publicDir, filename), publicTemplate);
        
        const migrationDir = path.resolve(process.cwd(), 'src/migrations');
        fs.mkdirSync(migrationDir, { recursive: true }); // Créer le répertoire, y compris les dossiers parents si nécessaire

        const httpDir = path.resolve(process.cwd(), 'src/http');
        fs.mkdirSync(httpDir, { recursive: true }); // Créer le répertoire, y compris les dossiers parents si nécessaire

        const commandDir = path.resolve(process.cwd(), 'src/commands');
        fs.mkdirSync(commandDir, { recursive: true }); // Créer le répertoire, y compris les dossiers parents si nécessaire

        const modelDir = path.resolve(process.cwd(), 'src/models');
        fs.mkdirSync(modelDir, { recursive: true }); // Créer le répertoire, y compris les dossiers parents si nécessaire

        const testDir = path.resolve(process.cwd(), 'test/');
        fs.mkdirSync(testDir, { recursive: true }); // Créer le répertoire, y compris les dossiers parents si nécessaire

        const gitignoreDir = path.resolve(process.cwd(), './');
        const gitfilename = `.gitignore`;

        const gitTemplate = `.env
/node_modules
/dist`;
        
        fs.writeFileSync(path.join(gitignoreDir, gitfilename), gitTemplate);

        new ControllerInit().execute();
        new RouterInit().execute();
        console.log('InitFileProject setup initialized');
    }
}