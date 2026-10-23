import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FEATURE_FLAGS } from '../config/feature-flags';
import { WorkspaceStore } from '../services/workspace.store';

export const aiAssistantGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const workspace = inject(WorkspaceStore);
  if (!FEATURE_FLAGS.AI_ASSISTANT_ENABLED) return router.createUrlTree(['/dashboard']);
  try {
    await workspace.loadSetup();
    return workspace.isModuleActive('AI_ASSISTANT') ? true : router.createUrlTree(['/dashboard']);
  } catch { return false; }
};
