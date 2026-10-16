import { TestBed } from '@angular/core/testing';
import { computed, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { AuthService } from './core/services/auth.service';
import { DoctorProfileService } from './core/services/doctor-profile.service';
import { WorkspaceStore } from './core/services/workspace.store';

describe('Anonymous public startup', () => {
  it('does not construct clinical profile or workspace services', async () => {
    const profile = vi.fn(() => { throw new Error('Private profile eagerly constructed'); });
    const workspace = vi.fn(() => { throw new Error('Private workspace eagerly constructed'); });
    const currentUser = signal(null);
    await TestBed.configureTestingModule({ imports: [App], providers: [
      provideRouter([]),
      { provide: AuthService, useValue: { currentUser, isSuperAdmin: () => false, isLoggedIn: computed(() => false) } },
      { provide: DoctorProfileService, useFactory: profile },
      { provide: WorkspaceStore, useFactory: workspace },
    ] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.isPublicPage()).toBe(true);
    expect(profile).not.toHaveBeenCalled();
    expect(workspace).not.toHaveBeenCalled();
  });
});
