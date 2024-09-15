interface ProviderContract {
    boot(): void;
    register(): Promise<void>;
}

export default ProviderContract;
