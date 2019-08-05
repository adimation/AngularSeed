import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { BaseService } from './abstraction/base-service.service';
import { ApplicationService } from './services/application.service';
import { SpinnerService } from './spinner/spinner.service';
import { LoggerService } from './services/logger.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { APP_SETTINGS, AppSettings } from './app-settings';
import { SpinnerComponent } from './spinner/spinner.component';
import { BaseComponent } from './abstraction/base-component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AuthGuard } from './guards/auth.guard';
import { AntiAuthGuard } from './guards/anti-auth.guard';
import { GlobalPermissionGuard } from './guards/global-permission.guard';
import { UserService } from './services/user.service';

@NgModule({
    imports: [
        CommonModule, // we use ngFor
        NgZorroAntdModule
    ],
    exports: [
        SpinnerComponent,
        BaseComponent
    ],
    declarations: [
        SpinnerComponent,
        BaseComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        BaseService,
        LoggerService,
        SpinnerService,
        ApplicationService,
        { provide: APP_SETTINGS, useValue: AppSettings },
        AuthGuard,
        AntiAuthGuard,
        GlobalPermissionGuard,
        UserService
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
