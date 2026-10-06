import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileDialogComponent } from './user-profile-dialog.component';
import { AuthService } from '../../core/services/auth.service';
import { PLATFORM_ID, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';

describe('UserProfileDialogComponent', () => {
  let component: UserProfileDialogComponent;
  let fixture: ComponentFixture<UserProfileDialogComponent>;
  let authServiceMock: {
    isProfileModalOpen: ReturnType<typeof signal<boolean>>;
    openProfileModal: ReturnType<typeof vi.fn>;
    closeProfileModal: ReturnType<typeof vi.fn>;
    currentUser: ReturnType<typeof signal<User | null>>;
    userName: ReturnType<typeof signal<string>>;
    userEmail: ReturnType<typeof signal<string | null>>;
    signOut: ReturnType<typeof vi.fn>;
  };

  const mockUser = {
    id: 'doc-789',
    email: 'dr.lucas@pointly.care',
    user_metadata: {
      full_name: 'Dr. Lucas Albarracín',
      dni: '38111222',
      role: 'Médico Pediatra Especialista',
      license: 'MP 84219',
    },
  } as unknown as User;

  beforeEach(async () => {
    const isProfileModalOpenSignal = signal<boolean>(false);
    const currentUserSignal = signal<User | null>(mockUser);
    const userNameSignal = signal<string>('Dr. Lucas Albarracín');
    const userEmailSignal = signal<string | null>('dr.lucas@pointly.care');

    authServiceMock = {
      isProfileModalOpen: isProfileModalOpenSignal,
      openProfileModal: vi.fn().mockImplementation(() => isProfileModalOpenSignal.set(true)),
      closeProfileModal: vi.fn().mockImplementation(() => isProfileModalOpenSignal.set(false)),
      currentUser: currentUserSignal,
      userName: userNameSignal,
      userEmail: userEmailSignal,
      signOut: vi.fn().mockResolvedValue({ error: null }),
    };

    await TestBed.configureTestingModule({
      imports: [UserProfileDialogComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with modal closed, not submitting, and null error', () => {
    expect(component.isOpen()).toBe(false);
    expect(component.isSubmitting()).toBe(false);
    expect(component.errorMessage()).toBeNull();
  });

  it('should open modal when window event open-profile-modal is dispatched', () => {
    window.dispatchEvent(new CustomEvent('open-profile-modal'));
    expect(component.isOpen()).toBe(true);
    expect(authServiceMock.openProfileModal).toHaveBeenCalled();
  });

  it('should open modal when authService.isProfileModalOpen signal is set to true', () => {
    authServiceMock.isProfileModalOpen.set(true);
    fixture.detectChanges();
    expect(component.isOpen()).toBe(true);
  });

  it('should close modal and call authService.closeProfileModal on closeModal', () => {
    component.openModal();
    expect(component.isOpen()).toBe(true);

    component.closeModal();
    expect(component.isOpen()).toBe(false);
    expect(authServiceMock.closeProfileModal).toHaveBeenCalled();
  });

  it('should close modal on Escape key if open and not submitting', () => {
    component.openModal();
    expect(component.isOpen()).toBe(true);

    component.onEscape();
    expect(component.isOpen()).toBe(false);
  });

  it('should not close modal on Escape key if isSubmitting is true', () => {
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

  it('should not close modal if clicking inside the dialog body', () => {
    component.openModal();
    expect(component.isOpen()).toBe(true);

    const backdrop = document.createElement('div');
    const dialog = document.createElement('div');
    backdrop.appendChild(dialog);

    const mockEvent = {
      target: dialog,
      currentTarget: backdrop,
    } as unknown as MouseEvent;

    component.onBackdropClick(mockEvent);
    expect(component.isOpen()).toBe(true);
  });

  it('should correctly compute user profile data from authService', () => {
    expect(component.fullName()).toBe('Dr. Lucas Albarracín');
    expect(component.email()).toBe('dr.lucas@pointly.care');
    expect(component.dni()).toBe('38111222');
    expect(component.role()).toBe('Médico Pediatra Especialista');
    expect(component.license()).toBe('MP 84219');
    expect(component.initials()).toBe('DL');
  });

  it('should fallback gracefully when user metadata is missing', () => {
    authServiceMock.currentUser.set({
      id: 'doc-minimal',
      email: 'solo.correo@hospital.com',
      user_metadata: {},
    } as unknown as User);
    authServiceMock.userName.set('solo.correo');
    authServiceMock.userEmail.set('solo.correo@hospital.com');

    expect(component.fullName()).toBe('solo.correo');
    expect(component.email()).toBe('solo.correo@hospital.com');
    expect(component.dni()).toBe('No especificado');
    expect(component.role()).toBe('Médico Especialista');
    expect(component.license()).toBe('No informada');
    expect(component.initials()).toBe('SO');
  });

  it('should call authService.signOut, dispatch auth-signout event, and close modal', async () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    component.openModal();
    expect(component.isOpen()).toBe(true);

    await component.handleSignOut();

    expect(authServiceMock.signOut).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'auth-signout' })
    );
    expect(component.isOpen()).toBe(false);

    dispatchSpy.mockRestore();
  });

  it('should display error message if authService.signOut fails', async () => {
    authServiceMock.signOut.mockResolvedValue({
      error: new Error('Error al desconectar la sesión'),
    });

    component.openModal();
    await component.handleSignOut();

    expect(component.isSubmitting()).toBe(false);
    expect(component.errorMessage()).toBe('Error al desconectar la sesión');
    expect(component.isOpen()).toBe(true);
  });

  it('should handle signOut rejection exception gracefully', async () => {
    authServiceMock.signOut.mockRejectedValue(new Error('Fallo de red crítico'));

    component.openModal();
    await component.handleSignOut();

    expect(component.isSubmitting()).toBe(false);
    expect(component.errorMessage()).toBe('Fallo de red crítico');
  });
});
