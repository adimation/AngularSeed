import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { RoutesModule } from './routes.module';
import { CoreModule } from './core/core.module';
import { ApplicationUserService } from './services/application-user.service';
import { AccountService } from './services/account.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    // IconModule,
    CoreModule
  ],
  providers: [
    { 
      provide: NZ_I18N,
      useValue: en_US
    },
    ApplicationUserService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
