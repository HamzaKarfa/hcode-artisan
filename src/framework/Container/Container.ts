import path from 'path';
import * as fs from 'fs';
import "reflect-metadata";

abstract class Container {
    public services: Map<string, unknown> = new Map();

    public get<T>(name: string): T {
        const service = this.services.get(name);
        if (!service) {
            throw new Error("Service not found:" + name);
        }
        return service as T;
    }
    list(): void {
        console.log(this.services);
    }

    async bind(name: string, concrete: Function|string|null): Promise<void> {
        if (this.services.has(name)) {
            return;
        }
        let resolvedService;
        if (typeof concrete === 'function') {
            resolvedService = concrete;
        } else if (typeof concrete === 'string') {
            const fullpath = this.findClassFile(concrete);
            if (fullpath === null) {
                this.services.set(name, concrete);
                return;
            }
            if (fullpath.prototype.constructor.length > 0) {
                const paramTypes = Reflect.getMetadata('design:paramtypes', fullpath.prototype.constructor);
                const params = await Promise.all(paramTypes.map(async (param: any) => {
                    if (typeof param === 'function' && this.services.has(param.name)) {
                        return this.get(param.name);
                    } else if (typeof param === 'function') {
                        await this.bind(param.name, param);
                        return this.get(param.name);
                    } else {
                        return param;
                    }
                }));
                resolvedService = new (require(fullpath) as any)(...params);
            } else {
                resolvedService = new (require(fullpath) as any)();
            }
        }
    
        this.services.set(name, resolvedService ?? concrete);
    }
    
    findClassFile(className: string): any {
        const files = fs.readdirSync(__dirname + '../../', { withFileTypes: true, recursive: true });
        const file = files.find((file) => {
            return file.name === className + '.ts' || file.name === className + '.js';
        });
        if (!file) {
            return null;
        }
        return path.join(__dirname + '../../', file.name);
    }
    
}

export default Container;





