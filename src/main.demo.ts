import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { bootstrapApplication } from '@angular/platform-browser';
import { DemoAppComponent } from './demo/demo-app.component';
import { demoConfig } from './demo/demo.config';

registerLocaleData(localeEsAr);

bootstrapApplication(DemoAppComponent, demoConfig).catch((error) => console.error(error));
