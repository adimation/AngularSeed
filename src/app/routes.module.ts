import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { AntiAuthGuard } from './core/guards/anti-auth.guard';
import { GlobalPermissionGuard } from './core/guards/global-permission.guard';

const routes: Routes = [
    {
        path: 'login',
        //canActivate: [AntiAuthGuard],
        loadChildren: './modules/login-module/login.module#LoginModule'
    },
    {
        path: '',
        //canActivate: [AuthGuard, GlobalPermissionGuard],
        loadChildren: './modules/dashboard-module/dashboard.module#DashboardModule'
    },
    { 
        path: '**', redirectTo: 'login'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: false }),
    ],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {}
