import { AuthService } from '../services/auth.service';
import { inject, Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  private readonly auth = inject(AuthService);

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data?.['preload'] && this.auth.isLoggedIn() && !this.auth.isSuperAdmin() && this.auth.hasDoctorchartPlan()) {
      return load();
    } else {
      return of(null);
    }
  }
}
