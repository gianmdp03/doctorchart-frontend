import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { UserProfilePageComponent } from './user-profile-page.component';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';

describe('UserProfilePageComponent', () => {
  const user = signal<any>(null);
  const name = signal('');
  const email = signal<string | null>(null);
  let signOut: ReturnType<typeof vi.fn>;
  const prepare = async () => {
    user.set({ id: 'doctor-a', user_metadata: { dni: '38111222', license: 'MP 84219', role: 'Médico Pediatra' } });
    name.set('Sofía Mendoza'); email.set('sofia@example.com');
    signOut = vi.fn().mockResolvedValue({ error: null });
    await TestBed.configureTestingModule({ imports: [UserProfilePageComponent], providers: [
      provideRouter([]),
      { provide: AuthService, useValue: { currentUser: user, userName: name, userEmail: email, signOut } },
      { provide: ActivePatientService, useValue: { clear: vi.fn() } },
      { provide: DoctorProfileService, useValue: { clearProfile: vi.fn() } },
      { provide: DoctorSpecialtyService, useValue: { currentSpecialtyOption: () => ({ label: 'Pediatría' }) } },
    ] }).compileComponents();
    const fixture = TestBed.createComponent(UserProfilePageComponent); fixture.detectChanges(); return fixture;
  };
  it('renders all professional information in the page without an overlay', async () => {
    const fixture = await prepare(); const component = fixture.componentInstance;
    expect(component.fullName()).toBe('Sofía Mendoza'); expect(component.dni()).toBe('38111222');
    expect(component.license()).toBe('MP 84219'); expect(component.initials()).toBe('SM');
    expect(fixture.nativeElement.textContent).toContain('Pediatría');
    expect(fixture.nativeElement.querySelector('[role="dialog"], [aria-modal], .m3-modal-backdrop')).toBeNull();
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe('/dashboard');
  });
  it('updates displayed identity and handles missing metadata', async () => {
    const fixture = await prepare(); user.set({ id: 'doctor-b', user_metadata: {} }); name.set('Lucas'); fixture.detectChanges();
    expect(fixture.componentInstance.dni()).toBe('No especificado');
    expect(fixture.componentInstance.license()).toBe('No informada');
    expect(fixture.componentInstance.initials()).toBe('LU');
    expect(fixture.nativeElement.textContent).not.toContain('MP 84219');
  });
  it('signs out and returns to the login route', async () => {
    const fixture = await prepare(); const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    await fixture.componentInstance.handleSignOut();
    expect(signOut).toHaveBeenCalledOnce(); expect(navigate).toHaveBeenCalledWith(['/login']);
  });
  it('keeps failures in the page and releases the submitting state', async () => {
    const fixture = await prepare(); signOut.mockResolvedValue({ error: new Error('No se pudo cerrar sesión.') });
    await fixture.componentInstance.handleSignOut(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('No se pudo cerrar sesión.');
    expect(fixture.componentInstance.isSubmitting()).toBe(false);
    signOut.mockRejectedValue(new Error('Error de red'));
    await fixture.componentInstance.handleSignOut(); expect(fixture.componentInstance.errorMessage()).toBe('Error de red');
  });
  it('does not clear the active clinical context when logout fails', async () => {
    const fixture = await prepare(); signOut.mockResolvedValue({error:new Error('offline')});
    const buttons=Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];
    buttons.find(button=>button.textContent?.includes('Cerrar sesión'))!.click();
    await fixture.whenStable();
    expect(TestBed.inject(ActivePatientService).clear).not.toHaveBeenCalled();
    expect(TestBed.inject(DoctorProfileService).clearProfile).not.toHaveBeenCalled();
  });
});
