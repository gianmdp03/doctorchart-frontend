import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginDialogComponent } from './login-dialog.component';
import { AuthService } from '../../core/services/auth.service';
import { PLATFORM_ID, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { Router } from '@angular/router';
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

  it('should open modal in register mode when event detail requests register', () => {
    window.dispatchEvent(
      new CustomEvent('open-login-modal', { detail: { mode: 'register' } })
    );
    expect(component.isOpen()).toBe(true);
    expect(component.mode()).toBe('register');
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

  it('should switch mode between login and register and reset error and success messages', () => {
    component.errorMessage.set('Error previo');
    component.successMessage.set('Éxito previo');

    component.setMode('register');
    expect(component.mode()).toBe('register');
    expect(component.errorMessage()).toBeNull();
    expect(component.successMessage()).toBeNull();

    component.setMode('login');
    expect(component.mode()).toBe('login');
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

  it('should not submit register if form is invalid and set error message', async () => {
    component.openModal();
    component.setMode('register');
    component.registerForm.patchValue({
      fullName: '',
      dni: '',
      email: 'invalid-email',
      password: '',
      confirmPassword: '',
    });

    await component.onRegisterSubmit();

    expect(authServiceMock.signUp).not.toHaveBeenCalled();
    expect(component.errorMessage()).toContain('Por favor complete todos los campos obligatorios');
  });

  it('should reject register submission if passwords do not match', async () => {
    component.openModal();
    component.setMode('register');
    component.registerForm.patchValue({
      fullName: 'Dr. Lucas Albarracín',
      dni: '38111222',
      email: 'lucas@hospital.com',
      password: 'password123',
      confirmPassword: 'differentPassword456',
    });

    await component.onRegisterSubmit();

    expect(authServiceMock.signUp).not.toHaveBeenCalled();
    expect(component.errorMessage()).toContain('Las contraseñas no coinciden');
  });

  it('should submit register successfully with auto-session, dispatch event and close modal', async () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    authServiceMock.signUp.mockResolvedValue({
      data: { user: mockUser, session: { access_token: 'new-session' } },
      error: null,
    });

    component.openModal();
    component.setMode('register');
    component.registerForm.patchValue({
      fullName: 'Dr. Lucas Albarracín',
      dni: '38111222',
      email: 'lucas@hospital.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    await component.onRegisterSubmit();

    expect(authServiceMock.signUp).toHaveBeenCalledWith({
      email: 'lucas@hospital.com',
      password: 'password123',
      options: {
        data: {
          full_name: 'Dr. Lucas Albarracín',
          dni: '38111222',
        },
      },
    });

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'auth-register-success' })
    );
    expect(component.isOpen()).toBe(false);

    dispatchSpy.mockRestore();
  });

  it('should submit register without session (email confirmation) and switch to login mode', async () => {
    authServiceMock.signUp.mockResolvedValue({
      data: { user: mockUser, session: null },
      error: null,
    });

    component.openModal();
    component.setMode('register');
    component.registerForm.patchValue({
      fullName: 'Dr. Lucas Albarracín',
      dni: '38111222',
      email: 'lucas@hospital.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    await component.onRegisterSubmit();

    expect(component.mode()).toBe('login');
    expect(component.loginForm.get('email')?.value).toBe('lucas@hospital.com');
    expect(component.successMessage()).toContain('¡Cuenta creada con éxito!');
  });

  it('should handle signUp error response by showing translated error message', async () => {
    authServiceMock.signUp.mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'User already registered' },
    });

    component.openModal();
    component.setMode('register');
    component.registerForm.patchValue({
      fullName: 'Dr. Lucas Albarracín',
      dni: '38111222',
      email: 'lucas@hospital.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    await component.onRegisterSubmit();

    expect(component.isSubmitting()).toBe(false);
    expect(component.errorMessage()).toContain('Ya existe una cuenta registrada');
  });

  it('should handle Google OAuth button click', async () => {
    authServiceMock.signInWithOAuth.mockResolvedValue({
      data: { provider: 'google', url: 'https://oauth.google.com' },
      error: null,
    });

    await component.handleGoogleOAuth();

    expect(authServiceMock.signInWithOAuth).toHaveBeenCalledWith('google');
  });

  it('should handle Google OAuth error gracefully', async () => {
    authServiceMock.signInWithOAuth.mockResolvedValue({
      data: { provider: 'google', url: null },
      error: { message: 'OAuth provider disabled' },
    });

    await component.handleGoogleOAuth();

    expect(component.errorMessage()).toBe('OAuth provider disabled');
    expect(component.isSubmitting()).toBe(false);
  });
});
