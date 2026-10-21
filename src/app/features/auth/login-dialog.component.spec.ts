import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginDialogComponent } from './login-dialog.component';
import { AuthService } from '../../core/services/auth.service';
import { PLATFORM_ID, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { provideRouter, Router } from '@angular/router';
import { LoginPageComponent } from './login-page.component';

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;
  let authServiceMock: {
    isLoginModalOpen: ReturnType<typeof signal<boolean>>;
    openLoginModal: ReturnType<typeof vi.fn>;
    closeLoginModal: ReturnType<typeof vi.fn>;
    signInWithPassword: ReturnType<typeof vi.fn>;
    signUp: ReturnType<typeof vi.fn>;
    signInWithOAuth: ReturnType<typeof vi.fn>;
  };

  const mockUser = {
    id: 'usr-456',
    email: 'pediatra@pointly.care',
    user_metadata: {
      full_name: 'Dr. Lucas Albarracín',
      dni: '38111222',
    },
  } as unknown as User;

  beforeEach(async () => {
    const isLoginModalOpenSignal = signal<boolean>(false);

    authServiceMock = {
      isLoginModalOpen: isLoginModalOpenSignal,
      openLoginModal: vi.fn().mockImplementation(() => isLoginModalOpenSignal.set(true)),
      closeLoginModal: vi.fn().mockImplementation(() => isLoginModalOpenSignal.set(false)),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signInWithOAuth: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [LoginDialogComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with modal closed, not submitting, and default login mode', () => {
    expect(component.isOpen()).toBe(false);
    expect(component.isSubmitting()).toBe(false);
    expect(component.mode()).toBe('login');
    expect(component.errorMessage()).toBeNull();
    expect(component.successMessage()).toBeNull();
    expect(component.showPassword()).toBe(false);
  });

  it.each(['dialog', 'page'])('preserves dormant registration validation (%s)', kind => {
    const login = kind === 'page' ? TestBed.createComponent(LoginPageComponent).componentInstance : component;
    login.registerForm.patchValue({ fullName: 'Ana Pérez', dni: '12345678', email: 'ana@example.com', password: 'password123', confirmPassword: 'different123' });
    login.registerForm.controls.confirmPassword.markAsDirty();
    expect(login.isRegisterInvalid('confirmPassword')).toBe(true);
    expect(login.registerError('confirmPassword')).toContain('no coinciden');
    expect(login.registerForm.invalid).toBe(true);
    login.registerForm.controls.confirmPassword.setValue('password123');
    expect(login.isRegisterInvalid('confirmPassword')).toBe(false);
    expect(login.registerForm.valid).toBe(true);
    login.registerForm.controls.dni.setValue('12.345.678');
    login.registerForm.controls.dni.markAsDirty();
    expect(login.isRegisterInvalid('dni')).toBe(true);
    expect(login.registerError('dni')).toContain('sin puntos');
  });

  it.each(['dialog', 'page'])('rechecks protected route guards after login on the same URL (%s)', async (kind) => {
    const router = TestBed.inject(Router);
    vi.spyOn(router, 'url', 'get').mockReturnValue('/dashboard');
    const navigation = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    authServiceMock.signInWithPassword.mockResolvedValue({ data: { user: mockUser }, error: null });
    const login = kind === 'page' ? TestBed.createComponent(LoginPageComponent).componentInstance : component;
    login.loginForm.patchValue({ email: 'fixture@example.test', password: 'FixtureOnly123!' });
    await login.onLoginSubmit();
    expect(navigation).toHaveBeenCalledWith('/dashboard', { onSameUrlNavigation: 'reload' });
  });

  it('should open modal when window event open-login-modal is dispatched in login mode', () => {
    window.dispatchEvent(new CustomEvent('open-login-modal'));
    expect(component.isOpen()).toBe(true);
    expect(component.mode()).toBe('login');
    expect(authServiceMock.openLoginModal).toHaveBeenCalled();
  });


  it('should open modal when authService.isLoginModalOpen signal is set to true', () => {
    authServiceMock.isLoginModalOpen.set(true);
    fixture.detectChanges();
    expect(component.isOpen()).toBe(true);
  });

  it('should close modal, call authService.closeLoginModal, and reset forms on closeModal', () => {
    component.openModal();
    component.loginForm.patchValue({ email: 'test@example.com', password: 'password123' });
    expect(component.isOpen()).toBe(true);

    component.closeModal();

    expect(component.isOpen()).toBe(false);
    expect(authServiceMock.closeLoginModal).toHaveBeenCalled();
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
    expect(component.errorMessage()).toBeNull();
  });

  it('should close modal on Escape key if open and not submitting', () => {
    component.openModal();
    expect(component.isOpen()).toBe(true);

    component.onEscape();
    expect(component.isOpen()).toBe(false);
  });

  it('should not close modal on Escape key if submitting', () => {
    component.openModal();
    component.isSubmitting.set(true);

    component.onEscape();
    expect(component.isOpen()).toBe(true);
  });

  it('should close modal on backdrop click', () => {
    component.openModal();
    expect(component.isOpen()).toBe(true);

    const mockDiv = document.createElement('div');
    const mockEvent = {
      target: mockDiv,
      currentTarget: mockDiv,
    } as unknown as MouseEvent;

    component.onBackdropClick(mockEvent);
    expect(component.isOpen()).toBe(false);
  });

  it('should not close modal if clicking inside the dialog content', () => {
    component.openModal();
    expect(component.isOpen()).toBe(true);

    const backdrop = document.createElement('div');
    const innerDialog = document.createElement('div');
    backdrop.appendChild(innerDialog);

    const mockEvent = {
      target: innerDialog,
      currentTarget: backdrop,
    } as unknown as MouseEvent;

    component.onBackdropClick(mockEvent);
    expect(component.isOpen()).toBe(true);
  });


  it('should toggle password visibility flag', () => {
    expect(component.showPassword()).toBe(false);

    component.togglePasswordVisibility();
    expect(component.showPassword()).toBe(true);

    component.togglePasswordVisibility();
    expect(component.showPassword()).toBe(false);
  });

  it('should not submit login if form is invalid and set error message', async () => {
    component.openModal();
    component.loginForm.patchValue({ email: '', password: '' });

    await component.onLoginSubmit();

    expect(authServiceMock.signInWithPassword).not.toHaveBeenCalled();
    expect(component.errorMessage()).toContain('Por favor ingrese un correo válido');
  });

  it('should submit login successfully, dispatch auth-success event, and close modal', async () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    authServiceMock.signInWithPassword.mockResolvedValue({
      data: { user: mockUser, session: { access_token: 'valid-jwt' } },
      error: null,
    });

    component.openModal();
    component.loginForm.patchValue({
      email: 'pediatra@pointly.care',
      password: 'mypassword123',
    });

    await component.onLoginSubmit();

    expect(authServiceMock.signInWithPassword).toHaveBeenCalledWith({
      email: 'pediatra@pointly.care',
      password: 'mypassword123',
    });
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'auth-success' })
    );
    expect(component.isOpen()).toBe(false);

    dispatchSpy.mockRestore();
  });

  it('should handle signInWithPassword error response by showing translated error message', async () => {
    authServiceMock.signInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'Invalid login credentials' },
    });

    component.openModal();
    component.loginForm.patchValue({
      email: 'pediatra@pointly.care',
      password: 'wrongpassword',
    });

    await component.onLoginSubmit();

    expect(component.isSubmitting()).toBe(false);
    expect(component.errorMessage()).toContain('Credenciales inválidas');
    expect(component.isOpen()).toBe(true);
  });

  it('should handle signInWithPassword promise rejection', async () => {
    authServiceMock.signInWithPassword.mockRejectedValue(new Error('Network connection failed'));

    component.openModal();
    component.loginForm.patchValue({
      email: 'pediatra@pointly.care',
      password: 'mypassword123',
    });

    await component.onLoginSubmit();

    expect(component.isSubmitting()).toBe(false);
    expect(component.errorMessage()).toContain('Network connection failed');
  });







  it.each(['dialog', 'page'])('routes registration to Bycode without signing up (%s)', async kind => {
    const login = kind === 'page' ? TestBed.createComponent(LoginPageComponent).componentInstance : component;
    const redirect = vi.spyOn(login, 'goToBycodeRegistration').mockImplementation(() => {});
    login.setMode('register');
    expect(redirect).toHaveBeenCalledOnce();
    expect(login.mode()).toBe('login');
    await login.onRegisterSubmit();
    expect(redirect).toHaveBeenCalledTimes(2);
    expect(authServiceMock.signUp).not.toHaveBeenCalled();
    await login.handleGoogleOAuth();
    expect(authServiceMock.signInWithOAuth).not.toHaveBeenCalled();
  });
  it('does not render Google or a local registration form', () => {
    component.openModal(); fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('Continuar con Google');
    expect(fixture.nativeElement.querySelector('input[formControlName="fullName"]')).toBeNull();
    const link = fixture.nativeElement.querySelector('a[href$="/register"]');
    expect(link?.textContent).toContain('Bycode');
    expect(link?.getAttribute('href')).toBe(component.bycodeRegisterUrl);
  });
  it('redirects register modal events to Bycode', () => {
    const redirect = vi.spyOn(component, 'goToBycodeRegistration').mockImplementation(() => {});
    component.openModal(new CustomEvent('open-login-modal', { detail: { mode: 'register' } }));
    expect(redirect).toHaveBeenCalledOnce();
    expect(authServiceMock.signUp).not.toHaveBeenCalled();
  });
});
