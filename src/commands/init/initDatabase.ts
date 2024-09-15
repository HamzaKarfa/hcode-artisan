

import * as fs from 'fs';
import * as path from 'path';


export default class InitDatabase {
    execute() {
        const modelDir = path.resolve(process.cwd(), 'framework/database');
        fs.mkdirSync(modelDir, { recursive: true }); // Créer le répertoire, y compris les dossiers parents si nécessaire
        const filename = `config.ts`;

        const modelTemplate = `import { connect } from '@tidbcloud/serverless';
import { drizzle } from 'drizzle-orm/tidb-serverless';
const client = connect({ url: config.database_url });
const db = drizzle(client);

export default db;
`;
        fs.writeFileSync(path.join(modelDir, filename), modelTemplate);
        console.log('Database setup initialized');
    }
}