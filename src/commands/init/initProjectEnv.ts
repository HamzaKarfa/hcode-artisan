

import * as fs from 'fs';
import * as path from 'path';


export default class InitProjectEnv {
    execute() {
        const modelDir = path.resolve(process.cwd(), './');
        const filename = `.env`;

        const modelTemplate = `
APP_PORT=3000

# DATABASE_URL=postgres://postgres:password@localhost:5432/hcode_artisan
DATABASE_URL=mysql://root:@127.0.0.1:5432/hcode_artisan
# DATABASE_URL=sqlite://localhost:5432/hcode_artisan
`;
        fs.writeFileSync(path.join(modelDir, filename), modelTemplate);
        console.log('.env setup initialized');
    }
}