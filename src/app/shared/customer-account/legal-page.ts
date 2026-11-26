import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, PLATFORM_ID, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CUSTOMER_ACCOUNT } from './account-context';
import { LEGAL_CONFIG } from './legal-config';

type LegalMode = 'terms' | 'privacy' | 'withdrawal';

interface WithdrawalApiResponse {
  id: number;
  code: string;
  mailSent: boolean;
  createdAt: string;
}

interface WithdrawalReceipt {
  code: string;
  requestTypeLabel: string;
  fullName: string;
  dni: string;
  email: string;
  productLabel: string;
  paymentReference: string;
  mailSent: boolean;
  createdAtText: string;
  whatsappHref: string;
  mailtoHref: string | null;
  summaryText: string;
}

@Component({
  selector: 'app-customer-legal-page',
  imports: [ReactiveFormsModule, RouterLink],
  styleUrls: ['./account.css', './legal-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="account-page">
      <div class="actions legal-no-print">
        <a class="button" [routerLink]="backRoute">Volver a {{ productName }}</a>
      </div>

      <header class="legal-header">
        @if (mode === 'terms') {
          <p class="legal-kicker">MARCO LEGAL · REPÚBLICA ARGENTINA</p>
          <h1>Términos y Condiciones de Uso</h1>
          <p class="legal-lead">
            Estas condiciones regulan el uso de {{ productName }} y de tu cuenta del ecosistema
            {{ legal.brandName }}. Te recomendamos leerlas antes de crear tu cuenta o contratar un
            plan.
          </p>
          <div class="legal-meta">
            <span>Versión vigente: <strong>{{ legal.termsVersion }}</strong></span>
            <span>Última actualización: <strong>{{ legal.lastUpdated }}</strong></span>
            <button type="button" class="button legal-no-print" (click)="printDocument()">
              Imprimir o guardar PDF
            </button>
          </div>
        } @else if (mode === 'privacy') {
          <p class="legal-kicker">LEY N.° 25.326 · PROTECCIÓN DE DATOS PERSONALES</p>
          <h1>Política de Privacidad</h1>
          <p class="legal-lead">
            Explicamos qué datos recolectamos en {{ productName }} y {{ legal.brandName }}, cómo los
            protegemos y cómo podés ejercer tus derechos de acceso, rectificación, actualización o
            supresión en Argentina.
          </p>
          <div class="legal-meta">
            <span>Versión vigente: <strong>{{ legal.privacyVersion }}</strong></span>
            <span>Última actualización: <strong>{{ legal.lastUpdated }}</strong></span>
            <button type="button" class="button legal-no-print" (click)="printDocument()">
              Imprimir o guardar PDF
            </button>
          </div>
        } @else {
          <p class="legal-kicker">LEY N.° 24.240 · DISPOSICIÓN 954/2025</p>
          <h1>Botón de arrepentimiento y baja</h1>
          <p class="legal-lead">
            Podés solicitar el arrepentimiento de una contratación dentro de los 10 días corridos o
            pedir la baja de tu servicio en {{ productName }} sin necesidad de iniciar sesión.
          </p>
        }

        <nav class="legal-tabs legal-no-print" aria-label="Documentos legales">
          <a class="button" routerLink="/terms" [attr.aria-current]="mode === 'terms' ? 'page' : null">
            Términos y condiciones
          </a>
          <a class="button" routerLink="/privacy" [attr.aria-current]="mode === 'privacy' ? 'page' : null">
            Política de privacidad
          </a>
          <a class="button" routerLink="/withdrawal" [attr.aria-current]="mode === 'withdrawal' ? 'page' : null">
            Botón de arrepentimiento y baja
          </a>
        </nav>
      </header>

      @if (mode === 'terms') {
        <article class="legal-body">
          <section class="legal-section">
            <h2>1. Identificación y aceptación</h2>
            <p>
              En cumplimiento del artículo 4 de la <strong>Ley N.° 24.240</strong> y del artículo
              1107 del <strong>Código Civil y Comercial de la Nación</strong>, se informa que
              <strong>{{ productName }}</strong> forma parte del ecosistema
              <strong>{{ legal.brandName }}</strong>:
            </p>
            <div class="legal-callout">
              <dl class="legal-dl">
                <dt>Plataforma</dt>
                <dd>{{ productName }} · {{ legal.brandName }} ({{ legal.siteUrl }})</dd>
                @if (legal.legalName) {
                  <dt>Titular / Razón social</dt>
                  <dd>{{ legal.legalName }}</dd>
                }
                @if (legal.cuit) {
                  <dt>CUIT</dt>
                  <dd>{{ legal.cuit }}</dd>
                }
                @if (legal.taxCondition) {
                  <dt>Condición fiscal</dt>
                  <dd>{{ legal.taxCondition }}</dd>
                }
                @if (legal.legalAddress) {
                  <dt>Domicilio legal</dt>
                  <dd>{{ legal.legalAddress }}</dd>
                }
                @if (legal.legalEmail) {
                  <dt>Correo legal</dt>
                  <dd>{{ legal.legalEmail }}</dd>
                }
                <dt>Canales de contacto</dt>
                <dd>
                  <a routerLink="/support/new">Soporte en línea</a> · WhatsApp
                  <a [href]="legal.whatsappUrl" target="_blank" rel="noopener noreferrer">{{
                    legal.whatsappNumber
                  }}</a>
                </dd>
                <dt>Atención comercial</dt>
                <dd>{{ legal.supportHours }}</dd>
              </dl>
            </div>
            <p>
              Al crear una cuenta o contratar un plan aceptás estos Términos y Condiciones y la
              <a routerLink="/privacy">Política de Privacidad</a>.
            </p>
          </section>

          <section class="legal-section">
            <h2>2. Licencia de uso SaaS y cuenta unificada</h2>
            <p>
              La contratación otorga una <strong>licencia de uso temporal, no exclusiva, revocable e
              intransferible</strong> bajo modalidad SaaS durante la vigencia de tu plan. Tu cuenta
              es personal e intransferible y te permite acceder a las aplicaciones habilitadas de
              Bycode (Pointly y DoctorChart). Los datos de registro (nombre, DNI y correo) deben ser
              verídicos.
            </p>
          </section>

          <section class="legal-section">
            <h2>3. Condiciones de Pointly</h2>
            <p>
              En <strong>Pointly</strong>, cada comercio define sus reglas de puntos, premios y
              promociones y es el único responsable frente a sus clientes finales por su cumplimiento
              y por la base de datos de clientes cargada (Ley N.° 25.326). Bycode actúa como
              encargado de tratamiento tecnológico.
            </p>
          </section>

          <section class="legal-section">
            <h2>4. Condiciones de DoctorChart (Datos de salud)</h2>
            <div class="legal-callout">
              <p>
                <strong>Ley N.° 26.529 (Derechos del Paciente e Historia Clínica) y Ley N.° 25.326:</strong>
                el paciente es el titular de su historia clínica, y el profesional o establecimiento
                de salud es su depositario y responsable legal, así como el obligado directo al
                secreto profesional y a los plazos de conservación.
              </p>
            </div>
            <p>
              Bycode provee infraestructura tecnológica segura y no realiza actos médicos,
              diagnósticos ni validaciones clínicas.
            </p>
          </section>

          <section class="legal-section">
            <h2>5. Planes, modalidad prepaga y renovaciones opcionales</h2>
            <ul>
              <li>
                Los planes prepagos no tienen cobros automáticos por defecto: pagás el período
                elegido y recargás cuando querés continuar.
              </li>
              <li>
                Si elegís configurar débito automático con tarjeta (Mobbex), autorizás expresamente el
                cobro recurrente informado y podés desactivarlo en cualquier momento conservando tus
                días ya abonados.
              </li>
              <li>
                Los precios vigentes se publican en <a routerLink="/pricing">Planes y precios</a>
                incluyendo el detalle sin impuestos nacionales conforme a la Resolución 4/2025.
              </li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>6. Arrepentimiento, baja, responsabilidad y jurisdicción</h2>
            <p>
              Podés ejercer el derecho de arrepentimiento dentro de los <strong>10 días corridos</strong>
              (Art. 34 Ley 24.240) o solicitar la baja sin trabas desde el
              <a routerLink="/withdrawal">Botón de arrepentimiento y baja</a>, con emisión de
              constancia dentro de las 24 horas (Disposición 954/2025).
            </p>
            <p>
              Estos Términos se rigen por las <strong>leyes de la República Argentina</strong>. Toda
              controversia se someterá a {{ legal.jurisdiction }}.
            </p>
          </section>
        </article>
      } @else if (mode === 'privacy') {
        <article class="legal-body">
          <section class="legal-section">
            <h2>1. Responsable y contacto</h2>
            <div class="legal-callout">
              <dl class="legal-dl">
                <dt>Plataforma</dt>
                <dd>{{ productName }} · {{ legal.brandName }} ({{ legal.siteUrl }})</dd>
                @if (legal.legalName) {
                  <dt>Titular / Razón social</dt>
                  <dd>{{ legal.legalName }}</dd>
                }
                @if (legal.cuit) {
                  <dt>CUIT</dt>
                  <dd>{{ legal.cuit }}</dd>
                }
                @if (legal.legalAddress) {
                  <dt>Domicilio legal</dt>
                  <dd>{{ legal.legalAddress }}</dd>
                }
                <dt>Contacto de privacidad</dt>
                <dd>
                  @if (legal.privacyEmail) {
                    {{ legal.privacyEmail }} ·
                  }
                  <a routerLink="/support/new">Soporte en línea</a> · WhatsApp
                  <a [href]="legal.whatsappUrl" target="_blank" rel="noopener noreferrer">{{
                    legal.whatsappNumber
                  }}</a>
                </dd>
              </dl>
            </div>
          </section>

          <section class="legal-section">
            <h2>2. Datos recolectados y roles (Ley N.° 25.326)</h2>
            <ul>
              <li>
                <strong>Datos de cuenta:</strong> nombre completo, DNI, correo electrónico y
                credenciales cifradas, utilizados para autenticar tu acceso, operar el servicio y
                brindar soporte.
              </li>
              <li>
                <strong>Pagos:</strong> referencias de operación informadas por las pasarelas
                (Mobbex / Raya). Bycode no almacena números completos de tarjeta ni códigos de
                seguridad.
              </li>
              <li>
                <strong>Encargado vs. Responsable:</strong> respecto de clientes cargados en Pointly
                y pacientes cargados en DoctorChart, el comercio o profesional es el responsable de
                la base de datos y Bycode actúa exclusivamente como encargado de tratamiento.
              </li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>3. Datos sensibles de salud, seguridad y transferencia internacional</h2>
            <p>
              La información clínica de DoctorChart constituye <strong>dato sensible</strong> (Arts.
              2 y 7 Ley 25.326 y Ley 26.529) y cuenta con aislamiento por cuenta y acceso
              autenticado. Aplicamos cifrado en tránsito (HTTPS/TLS) y resguardos contractuales
              cuando los proveedores de infraestructura operan servidores fuera de Argentina (Art. 12
              Ley 25.326).
            </p>
            <p>
              Usamos almacenamiento local y cookies técnicas únicamente para mantener tu sesión y tu
              preferencia de tema claro/oscuro.
            </p>
          </section>

          <section class="legal-section">
            <h2>4. Derechos ARCO y Órgano de Control (AAIP)</h2>
            <p>
              Podés ejercer tus derechos de acceso (gratuito cada 6 meses, respuesta en 10 días
              corridos), rectificación, actualización o supresión (respuesta en 5 días hábiles) desde
              <a routerLink="/support/new">Soporte en línea</a> o por
              <a [href]="legal.whatsappUrl" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
            </p>
            <div class="legal-callout" role="note" aria-label="Aviso obligatorio de la AAIP">
              <p>
                <strong>AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA:</strong> La
                <strong>Agencia de Acceso a la Información Pública (AAIP)</strong>, en su carácter de
                Órgano de Control de la Ley N.° 25.326, tiene la atribución de atender las denuncias
                y reclamos que interpongan quienes resulten afectados en sus derechos por
                incumplimiento de las normas vigentes en materia de protección de datos personales.
              </p>
              <p>
                Sitio oficial:
                <a [href]="legal.aaipUrl" target="_blank" rel="noopener noreferrer">{{
                  legal.aaipUrl
                }}</a>
              </p>
            </div>
          </section>
        </article>
      } @else {
        <div class="legal-body">
          <div class="legal-callout">
            <p>
              Los planes prepagos no se renuevan automáticamente al vencer. Si configuraste débito
              automático con tarjeta en Mobbex, podés desactivarlo al instante desde tu panel o
              pedir la baja acá mismo sin iniciar sesión.
            </p>
          </div>

          @if (receipt(); as r) {
            <section class="panel" role="status" aria-live="polite">
              <h2>Solicitud registrada correctamente</h2>
              <p class="muted">
                Tu gestión quedó guardada en Bycode con el código <strong>{{ r.code }}</strong>.
                @if (r.mailSent) {
                  Te enviamos una copia a <strong>{{ r.email }}</strong>.
                } @else {
                  Nuestro equipo procesará la solicitud dentro de las <strong>24 horas</strong>
                  (Disposición 954/2025).
                }
              </p>
              <dl class="legal-dl">
                <dt>Código de trámite</dt>
                <dd><strong>{{ r.code }}</strong></dd>
                <dt>Tipo de solicitud</dt>
                <dd>{{ r.requestTypeLabel }}</dd>
                <dt>Fecha y hora</dt>
                <dd>{{ r.createdAtText }}</dd>
                <dt>Titular</dt>
                <dd>{{ r.fullName }} (DNI {{ r.dni }})</dd>
                <dt>Correo</dt>
                <dd>{{ r.email }}</dd>
                <dt>Servicio</dt>
                <dd>{{ r.productLabel }}</dd>
                @if (r.paymentReference) {
                  <dt>Referencia de pago</dt>
                  <dd>{{ r.paymentReference }}</dd>
                }
              </dl>
              <div class="actions legal-no-print">
                <a class="button primary" [href]="r.whatsappHref" target="_blank" rel="noopener noreferrer">
                  Enviar por WhatsApp
                </a>
                @if (r.mailtoHref) {
                  <a class="button" [href]="r.mailtoHref">Enviar por correo</a>
                }
                <button class="button" type="button" (click)="copySummary(r.summaryText)">
                  {{ copied() ? 'Resumen copiado' : 'Copiar resumen' }}
                </button>
                <button class="button" type="button" (click)="printDocument()">
                  Imprimir constancia
                </button>
                <button class="button" type="button" (click)="resetForm()">Nueva solicitud</button>
              </div>
            </section>
          } @else {
            <form class="panel" [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
              <fieldset style="border:0;padding:0;margin:0;display:grid;gap:8px;">
                <legend style="font-size:.95rem;font-weight:650;">¿Qué gestión necesitás realizar?</legend>
                <div class="legal-choice-grid">
                  <label class="legal-choice">
                    <input type="radio" formControlName="requestType" value="withdrawal" />
                    <div>
                      <strong>Botón de arrepentimiento</strong>
                      <span>Contraté hace 10 días corridos o menos y quiero revocar la compra.</span>
                    </div>
                  </label>
                  <label class="legal-choice">
                    <input type="radio" formControlName="requestType" value="cancellation" />
                    <div>
                      <strong>Botón de baja</strong>
                      <span>Quiero dar de baja una suscripción, renovación automática o cuenta.</span>
                    </div>
                  </label>
                </div>
              </fieldset>

              <label for="lw-name">
                Nombre y apellido
                <input
                  id="lw-name"
                  type="text"
                  formControlName="fullName"
                  autocomplete="name"
                  placeholder="Tu nombre completo"
                  [attr.aria-invalid]="fieldInvalid('fullName') ? 'true' : 'false'"
                  [attr.aria-describedby]="fieldInvalid('fullName') ? 'lw-name-error' : null"
                />
                @if (fieldInvalid('fullName')) {
                  <span id="lw-name-error" class="legal-error">Ingresá tu nombre y apellido (mínimo 3 caracteres).</span>
                }
              </label>

              <div class="legal-grid-2">
                <label for="lw-dni">
                  DNI
                  <input
                    id="lw-dni"
                    type="text"
                    inputmode="numeric"
                    maxlength="9"
                    formControlName="dni"
                    placeholder="Ej. 30123456"
                    [attr.aria-invalid]="fieldInvalid('dni') ? 'true' : 'false'"
                    [attr.aria-describedby]="fieldInvalid('dni') ? 'lw-dni-error' : null"
                  />
                  @if (fieldInvalid('dni')) {
                    <span id="lw-dni-error" class="legal-error">Ingresá un DNI de 7 a 9 dígitos numéricos.</span>
                  }
                </label>

                <label for="lw-email">
                  Correo electrónico de tu cuenta
                  <input
                    id="lw-email"
                    type="email"
                    formControlName="email"
                    autocomplete="email"
                    placeholder="correo@ejemplo.com"
                    [attr.aria-invalid]="fieldInvalid('email') ? 'true' : 'false'"
                    [attr.aria-describedby]="fieldInvalid('email') ? 'lw-email-error' : null"
                  />
                  @if (fieldInvalid('email')) {
                    <span id="lw-email-error" class="legal-error">Ingresá un correo electrónico válido.</span>
                  }
                </label>
              </div>

              <div class="legal-grid-2">
                <label for="lw-product">
                  Servicio o cuenta
                  <select id="lw-product" formControlName="product" aria-invalid="false">
                    <option value="pointly">Pointly</option>
                    <option value="doctorchart">DoctorChart</option>
                    <option value="account">Cuenta completa Bycode</option>
                  </select>
                </label>

                <label for="lw-ref">
                  Fecha o referencia de pago (opcional)
                  <input
                    id="lw-ref"
                    type="text"
                    formControlName="paymentReference"
                    placeholder="Ej. 20/11/2026 o ID"
                    aria-invalid="false"
                  />
                </label>
              </div>

              <label for="lw-notes">
                Detalle adicional (opcional)
                <textarea id="lw-notes" formControlName="notes" rows="3" aria-invalid="false"></textarea>
              </label>

              @if (submitError()) {
                <p class="legal-error" role="alert">{{ submitError() }}</p>
              }

              <div class="actions form-submit">
                <button type="submit" class="button primary" [disabled]="submitting()">
                  {{ submitting() ? 'Registrando solicitud…' : 'Enviar solicitud' }}
                </button>
              </div>
            </form>
          }
        </div>
      }
    </main>
  `,
})
export class CustomerLegalPage {
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = inject(ElementRef, { optional: true });
  private readonly context = inject(CUSTOMER_ACCOUNT, { optional: true });

  protected readonly legal = LEGAL_CONFIG;
  protected readonly mode: LegalMode =
    (this.route.snapshot.data['legalMode'] as LegalMode | undefined) ?? 'terms';
  protected readonly product: 'pointly' | 'doctorchart' = this.context?.product ?? 'pointly';
  protected readonly productName = this.product === 'doctorchart' ? 'DoctorChart' : 'Pointly';
  protected readonly backRoute = this.product === 'doctorchart' ? '/professionals' : '/for-businesses';

  protected readonly receipt = signal<WithdrawalReceipt | null>(null);
  protected readonly copied = signal(false);
  protected readonly submitting = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected readonly form = this.fb.group({
    requestType: ['withdrawal' as 'withdrawal' | 'cancellation', [Validators.required]],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,9}$')]],
    email: ['', [Validators.required, Validators.email]],
    product: [this.product as 'pointly' | 'doctorchart' | 'account', [Validators.required]],
    paymentReference: [''],
    notes: [''],
  });

  fieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  async onSubmit(): Promise<void> {
    if (this.submitting()) return;
    this.submitError.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const root = this.host?.nativeElement as HTMLElement | undefined;
      (root?.querySelector('[aria-invalid="true"], .ng-invalid') as HTMLElement | null)?.focus();
      return;
    }
    const raw = this.form.getRawValue();
    const requestType = raw.requestType === 'cancellation' ? 'cancellation' : 'withdrawal';
    const requestTypeLabel =
      requestType === 'withdrawal'
        ? 'Arrepentimiento de compra (Ley 24.240)'
        : 'Baja de servicio / cuenta';
    const labels: Record<string, string> = {
      pointly: 'Pointly',
      doctorchart: 'DoctorChart',
      account: 'Cuenta completa Bycode',
    };
    const selectedProduct = (raw.product ?? this.product) as 'pointly' | 'doctorchart' | 'account';
    const productLabel = labels[selectedProduct] ?? this.productName;
    const fullName = (raw.fullName ?? '').trim();
    const dni = (raw.dni ?? '').trim();
    const email = (raw.email ?? '').trim();
    const paymentReference = (raw.paymentReference ?? '').trim();
    const notes = (raw.notes ?? '').trim();

    this.submitting.set(true);
    try {
      const apiBase = (this.context?.api ?? 'https://api.bycode.com.ar/api/billing/').replace(/\/+$/, '');
      const created = await firstValueFrom(
        this.http.post<WithdrawalApiResponse>(`${apiBase}/legal/withdrawal-requests`, {
          requestType,
          originApp: this.product,
          product: selectedProduct,
          fullName,
          dni,
          email,
          paymentReference,
          notes,
        }),
      );
      const createdAtDate = created.createdAt ? new Date(created.createdAt) : new Date();
      const createdAtText = createdAtDate.toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      const summaryText = [
        `Solicitud ${this.productName} (${created.code})`,
        `Tipo: ${requestTypeLabel}`,
        `Titular: ${fullName} (DNI ${dni})`,
        `Correo: ${email}`,
        `Servicio: ${productLabel}`,
        paymentReference ? `Referencia de pago: ${paymentReference}` : null,
        notes ? `Detalle: ${notes}` : null,
        `Fecha: ${createdAtText}`,
      ]
        .filter((line): line is string => !!line)
        .join('\n');

      const hasEmail = this.legal.legalEmail.trim().length > 0 && !this.legal.legalEmail.startsWith('[');
      this.copied.set(false);
      this.receipt.set({
        code: created.code,
        requestTypeLabel,
        fullName,
        dni,
        email,
        productLabel,
        paymentReference,
        mailSent: created.mailSent,
        createdAtText,
        whatsappHref: `${this.legal.whatsappUrl}?text=${encodeURIComponent(summaryText)}`,
        mailtoHref: hasEmail
          ? `mailto:${this.legal.legalEmail}?subject=${encodeURIComponent(`${requestTypeLabel} - ${created.code}`)}&body=${encodeURIComponent(summaryText)}`
          : null,
        summaryText,
      });
    } catch (err: unknown) {
      const httpErr = err as HttpErrorResponse | undefined;
      const serverMsg = (httpErr?.error as { message?: string } | undefined)?.message;
      this.submitError.set(
        serverMsg ||
          'No pudimos registrar la solicitud en este momento. Reintentá en unos segundos o escribinos por WhatsApp.',
      );
    } finally {
      this.submitting.set(false);
    }
  }

  async copySummary(text: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
    } catch {
      this.copied.set(false);
    }
  }

  printDocument(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.print();
    }
  }

  resetForm(): void {
    this.receipt.set(null);
    this.copied.set(false);
    this.form.reset({
      requestType: 'withdrawal',
      fullName: '',
      dni: '',
      email: '',
      product: this.product,
      paymentReference: '',
      notes: '',
    });
  }
}
