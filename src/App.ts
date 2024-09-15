import path from "path";
import Container from "./framework/Container/Container";
import ProviderContract from "@providers/Contracts/ProviderContract";

export default class App extends Container {
    protected serviceProviders: any[] = [];
    protected static instance: App;
    constructor() {
        super();
    }

    static async getInstance(): Promise<App> {
        if (!App.instance) {
            App.instance = new App();
            await App.instance.registerBaseBinding();
        }
        return App.instance;
    }
    async registerBaseBinding() {
        await this.registerBaseServiceProviders();
    }

    async registerBaseServiceProviders() {
        await this.register('AppServiceProvider');
        await this.register('RouteServiceProvider');
    }

     /**
     * Register a service provider with the application.
     *
     * @param  \Illuminate\Support\ServiceProvider|string  $provider
     * @param  bool  $force
     * @return \Illuminate\Support\ServiceProvider
     */
    async register(provider: ProviderContract|string, force: boolean = false) {
        // console.log('Registering service provider');
        if (typeof provider === 'string') {
            provider = await this.resolveProvider(provider);
        }
        await provider.register();
        this.serviceProviders.push(provider);
        return
    }

    async resolveProvider(providerName: string): Promise<ProviderContract> {
        const ProviderClass = await this.importProvider(providerName);
        if (!ProviderClass) {
            throw new Error('Provider not found');
        }
        return new (ProviderClass as any)(this);
    }

    async importProvider(providerName: string):Promise<string|void> {
        // import in framwork or in app
        try {
            return await this.importFrameworkProvider(providerName);
        } catch (error) {
            console.log('Framework provider not found');
        }

        try {
            return await this.importAppProvider(providerName);
        } catch (error) {
            console.log('App provider not found');
        }
    }

    async importFrameworkProvider(providerName: string): Promise<string> {
        const providerPath = "@providers/" + providerName;
        return (await import(providerPath)).default
    }

    async importAppProvider(providerName: string): Promise<string> {
        const providerPath = path.resolve(process.cwd(), "src/providers/", providerName);
        return (await import(providerPath)).default
    }
}