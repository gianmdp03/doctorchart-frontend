import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideIcons } from '@ng-icons/core';
import {
  lucideLayoutDashboard,
  lucideUsers,
  lucideCalculator,
  lucideCalendarDays,
  lucideSliders,
  lucideSlidersHorizontal,
  lucideChevronLeft,
  lucideChevronRight,
  lucideSearch,
  lucideUser,
  lucideLogOut,
  lucideExternalLink,
  lucideX,
  lucideType,
} from '@ng-icons/lucide';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { SelectivePreloadingStrategy } from './core/strategies/selective-preloading.strategy';
import { ArgentinaDateAdapter, ARGENTINA_DATE_FORMATS } from './core/date/argentina-date-adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withPreloading(SelectivePreloadingStrategy)),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideIcons({
      lucideLayoutDashboard,
      lucideUsers,
      lucideCalculator,
      lucideCalendarDays,
      lucideSliders,
      lucideSlidersHorizontal,
      lucideChevronLeft,
      lucideChevronRight,
      lucideSearch,
      lucideUser,
      lucideLogOut,
      lucideExternalLink,
      lucideX,
      lucideType,
    }),
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
    { provide: DateAdapter, useClass: ArgentinaDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: ARGENTINA_DATE_FORMATS },
  ],
};
