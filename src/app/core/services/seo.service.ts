import { DOCUMENT } from '@angular/common';
import { PUBLIC_SITE_URL } from '../config/seo.config';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

const PUBLIC_PAGES: Record<string, readonly [string, string]> = {
  "/": [
    "DoctorChart | Historias clínicas digitales y pacientes",
    "Organizá las fichas de tus pacientes, registrá consultas y personalizá tus formularios clínicos con DoctorChart."
  ]
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly destroyRef = inject(DestroyRef);
  private started = false;

  start(): void {
    if (this.started) return;
    this.started = true;
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(event => this.update(event.urlAfterRedirects));
  }

  private update(url: string): void {
    const pathname = url.split(/[?#]/)[0].replace(/\/$/, '') || '/';
    const page = PUBLIC_PAGES[pathname];
    this.meta.updateTag({ name: 'robots', content: page ? 'index, follow' : 'noindex, follow' });
    if (!page) {
      for (const property of ['og:title', 'og:description', 'og:type', 'og:site_name', 'og:locale', 'og:url', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt']) {
        this.meta.removeTag('property="' + property + '"');
      }
      for (const name of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']) {
        this.meta.removeTag('name="' + name + '"');
      }
      this.meta.removeTag('name="description"');
      this.document.head.querySelector('link[rel="canonical"]')?.remove();
      this.document.getElementById('public-page-schema')?.remove();
      return;
    }
    const [title, description] = page;
    const canonicalUrl = new URL(pathname, PUBLIC_SITE_URL).href;
    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    const imagePath = '/social/og-default.jpg';
    const imageUrl = new URL(imagePath, PUBLIC_SITE_URL).href;
    let schema = this.document.getElementById('public-page-schema') as HTMLScriptElement | null;
    if (!schema) {
      schema = this.document.createElement('script');
      schema.id = 'public-page-schema';
      schema.type = 'application/ld+json';
      this.document.head.appendChild(schema);
    }
    const applicationName = "DoctorChart";
    schema.textContent = JSON.stringify({
      '@id': canonicalUrl + '#webpage',
      ...(applicationName ? { about: { '@type': 'SoftwareApplication', name: applicationName, applicationCategory: 'HealthApplication', operatingSystem: 'Web', url: canonicalUrl } } : {}),
      '@context': 'https://schema.org', '@type': 'WebPage',
      url: canonicalUrl, name: title, description, inLanguage: 'es-AR',
      isPartOf: { '@type': 'WebSite', publisher: { '@type': 'Organization', name: 'ByCode Software', url: 'https://bycode.com.ar/' }, url: PUBLIC_SITE_URL + '/', name: 'DoctorChart' },
    });
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    for (const [property, content] of Object.entries({
      'og:title': title, 'og:description': description, 'og:type': 'website', 'og:url': canonicalUrl,
      'og:image': imageUrl, 'og:image:width': '1200', 'og:image:height': '630', 'og:image:alt': title,
      'og:site_name': 'DoctorChart', 'og:locale': 'es_AR',
    })) this.meta.updateTag({ property, content });
    for (const [name, content] of Object.entries({
      'twitter:card': 'summary_large_image', 'twitter:image': imageUrl, 'twitter:image:alt': title, 'twitter:title': title, 'twitter:description': description,
    })) this.meta.updateTag({ name, content });
  }
}
