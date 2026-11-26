import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { RegisterPageComponent } from './register-page.component';
import { AuthService } from '../../core/services/auth.service';

describe('Product signup', () => {
  const auth = { signUp: vi.fn() };

  beforeEach(() => {
    auth.signUp.mockReset().mockResolvedValue({ data: { user: { id: 'opaque-user', identities: [] }, session: null }, error: null });
    TestBed.configureTestingModule({
      imports: [RegisterPageComponent],
      providers: [provideRouter([]), { provide: AuthService, useValue: auth }],
    });
  });

  it('submits the shared identity fields and shows sign-in and recovery options', async () => {
    const fixture = TestBed.createComponent(RegisterPageComponent);
    fixture.detectChanges();
    fixture.componentInstance.form.setValue({
      fullName: 'Nombre Prueba', dni: '12345678', email: 'merchant@example.test',
      password: 'test-password', confirmation: 'test-password', acceptTerms: true,
    });
    await fixture.componentInstance.submit();
    fixture.detectChanges();
    expect(auth.signUp).toHaveBeenCalledOnce();
    expect(auth.signUp).toHaveBeenCalledWith({
      email: 'merchant@example.test', password: 'test-password',
      options: { data: { full_name: 'Nombre Prueba', dni: '12345678' } },
    });
    expect(fixture.nativeElement.textContent).toContain('Solicitud recibida');
    expect(fixture.nativeElement.textContent).toContain('Si necesitás confirmar tu correo');
    expect(fixture.nativeElement.querySelector('a[href="/forgot-password"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('a[href^="/login"]')).not.toBeNull();
  });

  it('reports a confirmation delivery failure and keeps the details available to retry', async () => {
    const failure = { status: 500, message: 'Invalid payload sent to hook' };
    auth.signUp.mockResolvedValue({ data: { user: null, session: null }, error: failure });
    const fixture = TestBed.createComponent(RegisterPageComponent);
    fixture.detectChanges();
    fixture.componentInstance.form.setValue({
      fullName: 'Nombre Prueba', dni: '12345678', email: 'merchant@example.test',
      password: 'test-password', confirmation: 'test-password', acceptTerms: true,
    });
    await fixture.componentInstance.submit();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No pudimos enviar el correo de confirmación');
    expect(fixture.componentInstance.form.controls.email.value).toBe('merchant@example.test');
    expect(fixture.componentInstance.awaitingConfirmation()).toBe(false);
  });

  it.each([
    [{ status: 409, message: 'DNI_ALREADY_IN_USE' }, 'Este DNI ya está en uso.'],
    [{ status: 500, message: 'Database error saving new user' }, 'Si ya registraste este DNI'],
    [{ status: 409, message: 'Other conflict' }, 'No pudimos completar el registro.'],
  ])('shows guidance for signup failure %j', async (error, expectedMessage) => {
    auth.signUp.mockResolvedValue({ data: { user: null, session: null }, error });
    const fixture = TestBed.createComponent(RegisterPageComponent);
    fixture.detectChanges();
    fixture.componentInstance.form.setValue({
      fullName: 'Nombre Prueba', dni: '12345678', email: 'merchant@example.test',
      password: 'test-password', confirmation: 'test-password', acceptTerms: true,
    });

    await fixture.componentInstance.submit();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain(expectedMessage);
    expect(fixture.componentInstance.form.controls.dni.value).toBe('12345678');
    expect(fixture.componentInstance.submitting()).toBe(false);
  });

  it('keeps the confirmation landing local and does not submit another registration', async () => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: { snapshot: { data: { confirmation: true } } } });
    const fixture = TestBed.createComponent(RegisterPageComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('form')).toBeNull();
    expect(fixture.nativeElement.querySelector('a[href^="/login"]')).not.toBeNull();
    await fixture.componentInstance.submit();
    expect(auth.signUp).not.toHaveBeenCalled();
  });

  it('requires accepting Terms and Privacy before calling signUp', async () => {
    const fixture = TestBed.createComponent(RegisterPageComponent);
    fixture.detectChanges();
    fixture.componentInstance.form.setValue({
      fullName: 'Nombre Prueba', dni: '12345678', email: 'merchant@example.test',
      password: 'test-password', confirmation: 'test-password', acceptTerms: false,
    });
    await fixture.componentInstance.submit();
    fixture.detectChanges();
    expect(auth.signUp).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('#signup-terms')?.getAttribute('aria-invalid')).toBe('true');
  });
});
