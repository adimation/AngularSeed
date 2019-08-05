import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HasPermissionDirective } from './directives/has-permission.directive';
import { BackgroundAnimationComponent } from './components/background-animation/background-animation.component';
import { TimeSinceModule } from '@thisissoon/angular-timesince'
import { HasRoleDirective } from './directives/has-role.directive';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule,
    TimeSinceModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    HasPermissionDirective,
    HasRoleDirective,
    BackgroundAnimationComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    HasPermissionDirective,
    HasRoleDirective,
    BackgroundAnimationComponent,
  ]
})
export class SharedModule { }
