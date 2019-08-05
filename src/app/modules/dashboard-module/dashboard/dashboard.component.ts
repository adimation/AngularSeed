import { LoggerService } from '../../../core/services/logger.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/abstraction/base-component';
import { ApplicationService } from '../../../core/services/application.service';
import { ApplicationUserService } from '../../../services/application-user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

    constructor(
        protected applicationService: ApplicationService,
        protected loggerService: LoggerService,
        protected applicationUserService: ApplicationUserService,
    ) {
        super(applicationService, loggerService);
    }

    public ngOnInit(): void {
    }
}
