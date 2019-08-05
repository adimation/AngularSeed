import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { BaseService } from '../core/abstraction/base-service.service';
import { IAppSettings, APP_SETTINGS } from '../core/app-settings';
import { ApplicationService } from '../core/services/application.service';
import { ResponseDTO } from '../models/base/response-dto';

@Injectable()
export class AccountService extends BaseService {

    constructor(
        @Inject(APP_SETTINGS) protected config: IAppSettings,
        protected applicationService: ApplicationService,
        protected userService: UserService
    ) {
        super(config, applicationService, userService);
    }

    public login(username: string, password: string): Observable<any> {
        return this.post<any>('authenticate', { username, password }, true);
    }
}
