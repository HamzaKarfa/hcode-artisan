// npx sequelize-cli init --config ./src/config --models-path ./src/models  --migrations-path ./src/migrations --seeders-path ./src/seeders



import Command from "./contracts/command";
import { Command as Commander } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import InitPackages from "./init/initPackages";
import InitDatabase from "./init/initDatabase";
import InitProjectEnv from "./init/initProjectEnv";
import InitFileProject from "./init/initFileProject";
import InitContainer from "./init/initContainer";

export class Init extends Command {
    
    constructor(command: Commander) {
        super(command, 'init', 'Setup Hcode-artisan project');
    }
    
    async run() {
        this.generateProject();
    }

    
    generateProject() {
        new InitPackages().execute();
        new InitContainer().execute();
        new InitDatabase().execute();
        new InitProjectEnv().execute();
        new InitFileProject().execute();
    }
}
