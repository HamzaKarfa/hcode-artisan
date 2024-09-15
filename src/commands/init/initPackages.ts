

import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';


export default class InitPackages {
    execute() {
        const modelDir = path.resolve(process.cwd(), './');
        const filename = `package.json`;

        const modelTemplate = `
{
  "name": "hcode-artisan",
  "version": "1.0.0",
  "main": "index.ts",
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "nodemon src/public/index.ts",
    "test": "npm run test"
  },
  "author": "HCodeStudio",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "@planetscale/database": "^1.19.0",
    "@tidbcloud/serverless": "^0.2.0",
    "hcode-artisan": "^1.0.2",
    "dotenv": "^16.4.5",
    "drizzle-orm": "^0.33.0",
    "express": "^4.21.0",
    "glob": "^11.0.0",
    "nodemon": "^3.1.4"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.5.4",
    "drizzle-kit": "^0.24.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.6.2"
  }
}`

        fs.writeFileSync(path.join(modelDir, filename), modelTemplate);
        console.log('package.json setup initialized');
        this.installPackages();
    }

    installPackages() {
        exec(`npm install --save`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error installing package: ${error.message}`);
                return;
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`Packages installed successfully!`);
        });
    }
}