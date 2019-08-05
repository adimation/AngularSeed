import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { ApplicationUserService } from '../../services/application-user.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalPermissionGuard implements CanActivate {
    constructor(
        public userService: UserService,
        private applicationUserService: ApplicationUserService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        // tslint:disable-next-line:prefer-const
        let canActivate = true;

        const permissionExist = (permissions: string[]): boolean => {
            let can = true;
            permissions.forEach((permission) => {
                const permissionFound = this.userService.currentUserPermissions.filter(row => row === permission).length;
                if (permissionFound === 0) {
                    can = false;
                }
            });
            return can;
        };

        // if (this.userService.currentUser == null) {
        //     return this.applicationUserService.getLoggedInUser().pipe(map(
        //         (data) => {
        //             if (route.data != null && route.data['globalComponentPermissions'] instanceof Array) {
        //                 return permissionExist(route.data['globalComponentPermissions']);
        //             }
        //             return canActivate;
        //         }
        //     ));
        // } else {
        //     if (route.data != null && route.data['globalComponentPermissions'] instanceof Array) {
        //         return permissionExist(route.data['globalComponentPermissions']);
        //     }
        // }
        return canActivate;
    }
}
