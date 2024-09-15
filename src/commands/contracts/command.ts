import { Command as Commander } from 'commander';

export default abstract class Command {
    
    command: Commander;

    constructor(command: Commander, public signature: string, public description: string) {
        this.command = command;
        this.init();
    }

    protected init() {
        this.command
        .command(this.signature)
        .description(this.description)
        .action((args: any) => {
            this.run(args);
        });
    }

    abstract run(args: any): Promise<any>;
}