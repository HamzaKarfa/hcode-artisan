import  * as path from "path";
import Container from "@/framework/Container/Container";
import { glob } from "glob";



export async function controllerRegister(container: Container, directory: string): Promise<void> {
    const fullPath = path.join(__dirname, "..",directory)
    const files = glob.sync(`${fullPath}/**/*.ts`);

    files.forEach((file: string) => {
        const modulePath = path.resolve(file);
        const module = require(modulePath);

        Object.keys(module).forEach(key => {
            const Class = module[key];
            if (typeof Class === 'function') {
                const instance = new Class(container);
            }
        });
    });
}