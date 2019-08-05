import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { PermissionsEnum } from '../../../enums/permission.enum';
import { ApplicationService } from 'src/app/core/services/application.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    public isCollapsed = false;
    public isReverseArrow = false;
    public width = 225;
    public version: string;

    public viewProductsListPerm: string = PermissionsEnum[PermissionsEnum.PERM_LIST_PRODUCTS];

    constructor(public userService: UserService, public applicationService: ApplicationService) { 
        this.version = this.applicationService.getApplicationVersion();
    }

    ngOnInit(): void {
    }

    public logout(): void {
        this.userService.logout();
    }
}
