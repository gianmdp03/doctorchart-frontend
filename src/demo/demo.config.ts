import { HttpBackend, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideCalendarDays,
  lucideChevronLeft,
  lucideChevronRight,
  lucideExternalLink,
  lucideLayoutDashboard,
  lucideLogOut,
  lucideSearch,
  lucideSliders,
  lucideSlidersHorizontal,
  lucideType,
  lucideUser,
  lucideUsers,
  lucideX,
} from '@ng-icons/lucide';
import { clinicalContextInterceptor } from '../app/core/interceptors/clinical-context.interceptor';
import { interactionInterceptor } from '../app/core/interceptors/interaction.interceptor';
import { timeZoneInterceptor } from '../app/core/interceptors/time-zone.interceptor';
import { ClinicalReuseStrategy } from '../app/core/routing/clinical-reuse.strategy';
import { AuthService } from '../app/core/services/auth.service';
import { DemoAuthService } from './demo-auth.service';
import { DemoHttpBackend } from './demo-http.backend';
import { demoRoutes } from './demo.routes';

export const demoConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: RouteReuseStrategy, useClass: ClinicalReuseStrategy },
    provideBrowserGlobalErrorListeners(),
    provideRouter(demoRoutes),
    provideAnimationsAsync(),
    { provide: AuthService, useExisting: DemoAuthService },
    provideHttpClient(
      withInterceptors([interactionInterceptor, clinicalContextInterceptor, timeZoneInterceptor]),
    ),
    { provide: HttpBackend, useExisting: DemoHttpBackend },
    provideIcons({
      lucideLayoutDashboard,
      lucideUsers,
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
