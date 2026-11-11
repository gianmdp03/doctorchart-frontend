import { clinicalContextInterceptor } from './core/interceptors/clinical-context.interceptor';
import { timeZoneInterceptor } from './core/interceptors/time-zone.interceptor';
import { SeoService } from './core/services/seo.service';
import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withPreloading, RouteReuseStrategy } from '@angular/router';
import { ClinicalReuseStrategy } from './core/routing/clinical-reuse.strategy';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
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
import { interactionInterceptor } from './core/interceptors/interaction.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide:RouteReuseStrategy,useClass:ClinicalReuseStrategy},
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(() => inject(SeoService).start()),
    provideRouter(routes, withPreloading(SelectivePreloadingStrategy)),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([interactionInterceptor, clinicalContextInterceptor, authInterceptor, timeZoneInterceptor])),
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
  ],
};
