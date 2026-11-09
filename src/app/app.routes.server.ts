import { RenderMode, ServerRoute } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'professionals', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
