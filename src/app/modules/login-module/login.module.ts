import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../../shared/shared.module';
import { LoginRoutesModule } from './login-routes.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutesModule,
    SharedModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
      LoginComponent,
      ForgotPasswordComponent,
      ResetPasswordComponent
  ]
})
export class LoginModule { }
