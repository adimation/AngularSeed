import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { BaseService } from '../core/abstraction/base-service.service';
import { IAppSettings, APP_SETTINGS } from '../core/app-settings';
import { ApplicationService } from '../core/services/application.service';
import { ResponseDTO } from '../models/base/response-dto';

@Injectable()
export class ApplicationUserService extends BaseService {

    constructor(
        @Inject(APP_SETTINGS) protected config: IAppSettings,
        protected applicationService: ApplicationService,
        protected userService: UserService
    ) {
        super(config, applicationService, userService);
    }

    //public getLoggedInUser(): Observable<ResponseDTO<UserDTO>> {
        // return this.get<ResponseDTO<ApplicationUserDTO>>('Account/GetLoggedInUser', false)
        // .pipe(map((resp: ResponseDTO<ApplicationUserDTO>) => {
        //     // setting logged in user in userService every time this service is called
        //     // permissions are being extracted for ease of use.
        //     this.userService.currentUser = resp.PayLoad;
        //     if (resp.PayLoad.AssignedRoles != null && resp.PayLoad.AssignedRoles.length > 0) {
        //         resp.PayLoad.AssignedRoles.forEach((roles: RoleDTO) => {
        //             if (roles.Permissions != null && roles.Permissions.length > 0) {
        //                 roles.Permissions.forEach((permissions: PermissionDTO) => {
        //                     this.userService.currentUserPermissions.push(permissions.Code);
        //                 });
        //             }
        //         });
        //     }
        //     return resp;
        // }));
    //}
}
