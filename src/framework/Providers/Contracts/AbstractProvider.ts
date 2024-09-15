import ProviderContract from '@providers/Contracts/ProviderContract';
import App from '@/App';

abstract class AbstractProvider implements ProviderContract {
    protected app: App;	

    constructor(app: App) {
        this.app = app;
    }

    abstract boot(): void;
    abstract register(): Promise<void>;
}

export default AbstractProvider;