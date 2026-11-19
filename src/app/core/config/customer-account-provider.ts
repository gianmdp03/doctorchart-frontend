import { inject } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { CUSTOMER_ACCOUNT, CustomerAccountContext } from '../../shared/customer-account/account-context';
import { AuthService } from '../services/auth.service';
import { createAuthFetch } from '../services/auth-fetch';

export const customerAccountProvider = {
  provide: CUSTOMER_ACCOUNT,
  useFactory: (): CustomerAccountContext => {
    const auth = inject(AuthService);
    return {
      product: 'doctorchart', api: environment.apiUrl,
      ready: () => auth.authReady,
      owner: () => auth.currentUser()?.id,
      token: async () => auth.getAccessToken(),
      signOut: async () => {
        const result = await auth.signOut();
        if (result.error) throw result.error;
      },
      auth: () => auth.sharedAccountClient(),
      isolatedAuth: () => createClient(environment.supabase.url, environment.supabase.publishableKey, {
        global: { fetch: createAuthFetch() },
        auth: { storageKey: 'bycode-account-link', detectSessionInUrl: false, persistSession: false, autoRefreshToken: false },
      }),
    };
  },
};
