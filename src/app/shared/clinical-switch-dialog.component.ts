import {Component,inject} from '@angular/core';
import {ClinicalNavigationService} from '../core/services/clinical-navigation.service';
import {A11yModule} from '@angular/cdk/a11y';
@Component({selector:'app-clinical-switch-dialog',imports:[A11yModule],template:`
 @if(state.notice()){<div class="switch-notice" role="status">{{state.notice()}}<button (click)="state.notice.set('')">Entendido</button></div>}
 @if(state.dialog()){<div class="switch-backdrop"><section cdkTrapFocus [cdkTrapFocusAutoCapture]="true" (keydown.escape)="state.answer('cancel')" role="alertdialog" aria-modal="true" aria-labelledby="switch-title" aria-describedby="switch-instructions"><h2 id="switch-title">Tenés cambios sin guardar</h2><p id="switch-instructions">Podés volver a guardarlos antes de cambiar de pantalla o especialidad.</p><div class="actions"><button type="button" (click)="state.answer('save')">Guardar antes de cambiar</button><button type="button" (click)="state.answer('discard')">Descartar y continuar</button><button type="button" cdkFocusInitial (click)="state.answer('cancel')">Cancelar</button></div></section></div>}
 `,styleUrl: './clinical-switch-dialog.component.css'})
export class ClinicalSwitchDialogComponent {readonly state=inject(ClinicalNavigationService);}
