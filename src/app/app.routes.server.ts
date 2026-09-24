import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'dashboard',
    renderMode: RenderMode.Client,
  },
  {
    path: 'consultas',
    renderMode: RenderMode.Client,
  },
  {
    path: 'onboarding/select-specialty',
    renderMode: RenderMode.Client,
  },
  {
    path: 'ficha',
    renderMode: RenderMode.Client,
  },
  {
    path: 'ficha/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'pacientes',
    renderMode: RenderMode.Client,
  },
  {
    path: 'pacientes/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
