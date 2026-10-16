import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ selector: 'app-not-found', imports: [RouterLink], template: '<main class="not-found"><h1>Página no encontrada</h1><p>La dirección no existe o cambió.</p><a routerLink="/">Volver al inicio</a></main>', styles: '.not-found{max-width:42rem;margin:5rem auto;padding:2rem;font-family:system-ui;line-height:1.6}.not-found h1{font-size:2rem}.not-found a{display:inline-block;padding:1rem;text-decoration:underline}.not-found a:focus-visible{outline:3px solid currentColor;outline-offset:3px}' })
export class NotFoundComponent {}
