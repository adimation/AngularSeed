import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export let APP_SETTINGS = new InjectionToken<IAppSettings>('app.settings');

export interface IAppSettings {
    currentVersion: string;
    apiEndpoint: string;
    baseUrl: string;
    notificationPlacement: string;
    requestTimeoutValue: number;
}

export const AppSettings: IAppSettings = {
    currentVersion: '1.0.0',
    apiEndpoint: environment.apiEndpoint,
    baseUrl: environment.baseUrl,
    notificationPlacement: 'bottomLeft',
    requestTimeoutValue: 2 * 60 * 1000
};
