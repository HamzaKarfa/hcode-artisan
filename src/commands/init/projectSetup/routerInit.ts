import * as fs from "fs";
import path = require("path");


export default class RouterInit {


    execute() { 
        const modelDir = path.resolve(process.cwd(), 'src/routes');
        fs.mkdirSync(modelDir, { recursive: true }); // Créer le répertoire, y compris les dossiers parents si nécessaire
        const filename = `api.ts`;

        const modelTemplate = `import { Router } from 'express';
import Container from '../../framework/container/container';

class ApiRouter {
    public router: Router;
    // private postController: PostController;

    constructor(router: Router) {
        this.router = router;
        // this.postController = Container.getInstance().get<PostController>('PostController');
        this.init();
    }

    private init() {
        // this.router.get('/posts', async (req, res) => await this.postController.index(req, res));
        // this.router.get('/posts/:id', this.postController.show);
        // this.router.post('/posts', this.postController.store);
        // this.router.put('/posts/:id', this.postController.update);
        // this.router.delete('/posts/:id', this.postController.destroy);
    }
}

export default ApiRouter;`;

        fs.writeFileSync(path.join(modelDir, filename), modelTemplate);
        console.log('Database setup initialized');            
    }

}