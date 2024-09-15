import Command from "./contracts/command";
import { Command as Commander } from 'commander';
import * as fs from 'fs';
import * as path from 'path';

export class MakeModel extends Command {
    
    constructor(command: Commander) {
        super(command, 'make:model <name>', 'Créer un nouveau model');
    }
    
    async run(args:any) {
       console.log('run model');
        this.generateModel(args);
       
    }

    
    generateModel(name: string) {
        const modelDir = path.resolve(process.cwd(), 'src/models');
        const modelName = `${name}.ts`;
    
        if (!fs.existsSync(modelDir)) {
        fs.mkdirSync(modelDir, { recursive: true });
        }
    
        const modelTemplate = `
        import { DataTypes, Model, Sequelize } from "sequelize";
        import Container from "../serviceContainer/container";
        const sequelize = Container.getInstance().get<Sequelize>('sequelize');

        export class ${name} extends Model {
            public id!: number;
        }
        ${name}.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
        }, {
            sequelize,
            modelName: '${name}',
        });
        `;
    
        fs.writeFileSync(path.join(modelDir, modelName), modelTemplate);
        console.log(`Modèle ${modelName} créé avec succès !`);
    }
}
