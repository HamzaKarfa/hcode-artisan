#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { MakeModel } from './model';
import { MakeController } from './controller';
import { Init } from './init';

const [,, ...args] = process.argv;
const command = args[0];
const argument = args[1];


const commander = new Command();
commander
    .name('hcode-artisan')
    .version('1.0.0')
    .description('HCode Artisan CLI');
new Init(commander);
new MakeModel(commander);
new MakeController(commander)

commander.parse(process.argv);