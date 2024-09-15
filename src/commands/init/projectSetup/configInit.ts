import * as fs from "fs";
import path = require("path");


export default class ServerInit {


    execute() { 
        const modelDir = path.resolve(process.cwd(), 'src/config/');
        fs.mkdirSync(modelDir, { recursive: true }); // Créer le répertoire, y compris les dossiers parents si nécessaire
        const filename = `database.ts`;

        const modelTemplate = `export const config = {
    datable_url: process.env.DATABASE_URL,
    database_type: process.env.DATABASE_URL.split(':')[0]
}
        `;

        fs.writeFileSync(path.join(modelDir, filename), modelTemplate);
        console.log('Database setup initialized');            
    }

}