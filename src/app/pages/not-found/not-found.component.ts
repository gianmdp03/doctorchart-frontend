import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ selector: 'app-not-found', imports: [RouterLink], template: '<main class="not-found"><h1>Página no encontrada</h1><p>La dirección no existe o cambió.</p><a routerLink="/">Volver al inicio</a></main>', styleUrl: './not-found.component.css' })
export class NotFoundComponent {}
