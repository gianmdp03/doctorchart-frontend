import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SeoService } from './seo.service';

describe('Public page metadata', () => {
  let events: Subject<NavigationEnd>;
  let meta: Meta;
  beforeEach(() => {
    events = new Subject<NavigationEnd>();
    TestBed.configureTestingModule({ providers: [{ provide: Router, useValue: { events } }] });
    meta = TestBed.inject(Meta);
    TestBed.inject(SeoService).start();
  });
  afterEach(() => {
    for (const node of document.head.querySelectorAll('meta[name="robots"], meta[name="description"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], #public-page-schema')) node.remove();
  });
  it('restores public metadata after private navigation without duplicate tags', () => {
    events.next(new NavigationEnd(1, '/?source=test#features', '/?source=test#features'));
    expect(meta.getTag('name="robots"')?.content).toBe('index, follow');
    expect(meta.getTag('property="og:title"')?.content).toBeTruthy();
    expect(document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://doctorchart.bycode.com.ar/');
    events.next(new NavigationEnd(2, '/login', '/login'));
    expect(meta.getTag('name="robots"')?.content).toBe('noindex, follow');
    expect(meta.getTag('property="og:title"')).toBeNull();
    expect(document.getElementById('public-page-schema')).toBeNull();
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    events.next(new NavigationEnd(3, '/', '/'));
    expect(meta.getTag('name="robots"')?.content).toBe('index, follow');
    expect(meta.getTag('name="description"')?.content).toBeTruthy();
    expect(document.head.querySelectorAll('meta[name="robots"]').length).toBe(1);
    expect(document.head.querySelectorAll('meta[property="og:title"]').length).toBe(1);
  });
  it('uses the final redirect destination to decide indexing', () => {
    events.next(new NavigationEnd(1, '/unknown', '/'));
    expect(meta.getTag('name="robots"')?.content).toBe('index, follow');
    events.next(new NavigationEnd(2, '/', '/dashboard'));
    expect(meta.getTag('name="robots"')?.content).toBe('noindex, follow');
  });
});
