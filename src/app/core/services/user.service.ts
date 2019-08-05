
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IAppSettings, APP_SETTINGS } from '../app-settings';
import { LocalStorageService } from './local-storage.service';
import { ApplicationService } from './application.service';

@Injectable()
export class UserService {
    public currentUserPermissions: string[] = [];
    public currentUser: any;//ApplicationUserDTO;

    constructor(
        @Inject(APP_SETTINGS) protected config: IAppSettings,
        protected applicationService: ApplicationService,
        protected localStorageService: LocalStorageService,
        protected router: Router
    ) {
    }

    public logout(): void {
        this.currentUser = null;
        this.currentUserPermissions = [];
        this.localStorageService.removeToken();
        this.router.navigate(['login']);
    }

    public isLoggedIn(): boolean {
        return this.localStorageService.getToken() !== null;
    }

    public getToken(): string {
        return this.localStorageService.getToken();
    }

    public getUserName(): string {
        if (this.currentUser) {
            return this.currentUser.UserName;
        }
        return null;
    }
}
