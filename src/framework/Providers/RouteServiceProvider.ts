import AbstractProvider from '@providers/Contracts/AbstractProvider';
import ProviderContract from '@providers/Contracts/ProviderContract';
import { Router } from 'express';

class RouteServiceProvider extends AbstractProvider implements ProviderContract {
    
    async boot() {
        console.log('Booting RouteServiceProvider');
    }

    async register() {
        this.app.bind('route', Router());
    }
}

export default RouteServiceProvider;