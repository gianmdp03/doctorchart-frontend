import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'onboarding/select-specialty',
    renderMode: RenderMode.Client,
  },
  {
    path: 'ficha',
    renderMode: RenderMode.Client,
  },
  {
    path: 'pacientes',
    renderMode: RenderMode.Client,
  },
  {
    path: 'curvas',
    renderMode: RenderMode.Client,
  },
  {
    path: 'hitos',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
