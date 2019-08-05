import { Component } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { LoggerService } from '../services/logger.service';

@Component({
    template: ''
})
export class BaseComponent {
    constructor(
        protected applicationService: ApplicationService,
        protected loggerService: LoggerService) {
    }
}
