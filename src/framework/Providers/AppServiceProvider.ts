import ProviderContract from '@providers/Contracts/ProviderContract';
import AbstractProvider from '@providers/Contracts/AbstractProvider';
import express from 'express';

class AppServiceProvider extends AbstractProvider implements ProviderContract {
    
    async boot() {
        console.log('Booting AppServiceProvider');
    }

    async register() {
        this.app.bind('express', express());
        this.app.bind('port', process.env.APP_PORT ?? '3000');
    }
}

export default AppServiceProvider;