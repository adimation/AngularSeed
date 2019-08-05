import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AntiAuthGuard implements CanActivate {
    constructor(public userService: UserService, public router: Router) { }

    canActivate(): boolean {
        if (this.userService.isLoggedIn()) {
            this.router.navigate(['dashboard']);
            return false;
        }
        return true;
    }
}
