import { isPlatformBrowser } from '@angular/common';
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface CustomerAccountContext {
  product: 'pointly' | 'doctorchart';
  api: string;
  ready(): Promise<unknown>;
  owner(): string | null | undefined;
  token(): Promise<string | null | undefined>;
  signOut(): Promise<void>;
  auth(): SupabaseClient;
  isolatedAuth(): SupabaseClient;
}

export const CUSTOMER_ACCOUNT = new InjectionToken<CustomerAccountContext>('Bycode customer account');

export const customerAccountGuard: CanActivateFn = async (_, state) => {
  const context = inject(CUSTOMER_ACCOUNT);
  const router = inject(Router);
  if (!isPlatformBrowser(inject(PLATFORM_ID))) return true;
  await context.ready();
  return context.owner() ? true : router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
