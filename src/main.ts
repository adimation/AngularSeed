import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppInjector } from './app/app.injector';
import { environment } from './environments/environment';

import './extensions';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then((moduleRef) => {
  AppInjector.setInjector(moduleRef.injector);
}).catch(err => console.error(err));
