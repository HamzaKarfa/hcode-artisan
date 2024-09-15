import { Router } from 'express';

interface RouterContract {
    loadRoutes(): void;
}


abstract class AbstractRouter implements RouterContract {
    private router: Router;

    constructor(router: Router, ...args: any[]) {
        this.router = router;
        this.init();

    }

    private init() {
        this.router.get('/', async (req, res) => res.send('Welcome in HCode-Artisan framework !'));
    }

    abstract loadRoutes(): void;
}

export default AbstractRouter;