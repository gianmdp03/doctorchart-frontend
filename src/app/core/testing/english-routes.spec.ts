import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { routes } from '../../app.routes';

@Component({ standalone: true, template: '<p>Route destination</p>' })
class Destination {}

describe('English canonical application routes', () => {
  afterEach(() => TestBed.resetTestingModule());
  it('retains old bookmarks and query parameters while resolving English URLs', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes.filter(route => route.path !== '**').map(route =>
      route.redirectTo ? route : { path: route.path, component: Destination, pathMatch: route.pathMatch }
    ))] });
    const harness = await RouterTestingHarness.create();
    for (const [old, canonical] of [
      ['/pacientes/nuevo', '/patients/new'],
      ['/pacientes/42/editar', '/patients/42/edit'],
      ['/ficha/42', '/records/42'],
      ['/consultas/77', '/encounters/77'],
      ['/admin/especialidades', '/admin/specialties'],
      ['/perfil', '/profile'],
      ['/sin-plan', '/plan-required'],
    ]) {
      await harness.navigateByUrl(old + '?source=bookmark');
      expect(TestBed.inject(Router).url).toBe(canonical + '?source=bookmark');
    }
  });
  it('keeps application pages behind their existing guards', () => {
    for (const route of routes.filter(route => route.loadComponent && route.path !== '**')) {
      if (route.path === '' || route.path === 'login') continue;
      expect(route.canActivate?.length).toBeGreaterThan(0);
      expect(route.path).not.toMatch(/pacientes|consultas|perfil|asistente|sin-plan|especialidades|calculadoras|ficha|vacunacion|editar|nuevo/);
    }
  });
});
