import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AiAssistantPageComponent } from './ai-assistant-page.component';
import { AiChatService } from '../../core/services/ai-chat.service';
import { FEATURE_FLAGS } from '../../core/config/feature-flags';

describe('AiAssistantPageComponent', () => {
  let component: AiAssistantPageComponent;
  let fixture: ComponentFixture<AiAssistantPageComponent>;
  let chatService: AiChatService;

  beforeEach(async () => {
    FEATURE_FLAGS.AI_ASSISTANT_ENABLED = true;
    await TestBed.configureTestingModule({
      imports: [AiAssistantPageComponent],
      providers: [
        AiChatService,
        provideRouter([]),
        {provide: WorkspaceStore, useValue: {specialtyCode: () => 'pediatrics', activeModules: () => ({AI_ASSISTANT: true}), isModuleActive: () => true}},
        {provide: AuthService, useValue: {currentUser: signal({id: 'doctor-a'})}},
        {provide: ActivePatientService, useValue: {activePatient: signal(null)}},
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AiAssistantPageComponent);
    component = fixture.componentInstance;
    chatService = TestBed.inject(AiChatService);
    fixture.detectChanges();
  });

  afterEach(() => { FEATURE_FLAGS.AI_ASSISTANT_ENABLED = false; });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the assistant as page content without a floating trigger or dialog', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(chatService.isOpen()).toBe(true);
    expect(el.querySelector('[data-testid="chat-page"]')).not.toBeNull();
    expect(el.querySelector('[role="dialog"]')).toBeNull();
    expect(el.querySelector('[data-testid="fab-trigger"]')).toBeNull();
    fixture.destroy(); expect(chatService.isOpen()).toBe(false);
  });

  it('should format markdown text correctly', () => {
    const boldText = component.formatMessageText('Evaluar **curva OMS**');
    expect(boldText).toContain('<strong class="font-semibold">curva OMS</strong>');

    const italicText = component.formatMessageText('Valor *normal*');
    expect(italicText).toContain('<em class="italic">normal</em>');

    const listText = component.formatMessageText('- Peso\n- Talla');
    expect(listText).toContain('•');
    expect(listText).toContain('Peso');

    const numberedListText = component.formatMessageText('1. Control a los 2 meses\n2. Vacunación');
    expect(numberedListText).toContain('1.');
    expect(numberedListText).toContain('Control a los 2 meses');

    const emptyText = component.formatMessageText('');
    expect(emptyText).toBe('');
  });

  it('should trigger sendMessage when clicking a prompt chip', () => {
    const sendSpy = vi.spyOn(chatService, 'sendMessage');
    const testPrompt = 'Interpretar percentil de peso/edad';

    component.onPromptClick(testPrompt);
    expect(sendSpy).toHaveBeenCalledWith(testPrompt);
  });

  it('should clear inputMessage when sending message', () => {
    const sendSpy = vi.spyOn(chatService, 'sendMessage');
    component.inputMessage.set('¿Cuál es el percentil esperado?');

    component.onSendMessage();
    expect(sendSpy).toHaveBeenCalledWith('¿Cuál es el percentil esperado?');
    expect(component.inputMessage()).toBe('');
  });

  it('should not send message if inputMessage is blank', () => {
    const sendSpy = vi.spyOn(chatService, 'sendMessage');
    component.inputMessage.set('   ');

    component.onSendMessage();
    expect(sendSpy).not.toHaveBeenCalled();
  });

  it('should send on Enter key but not on Shift+Enter', () => {
    const sendSpy = vi.spyOn(component, 'onSendMessage');

    const shiftEnterEvent = new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true });
    component.onKeyDown(shiftEnterEvent);
    expect(sendSpy).not.toHaveBeenCalled();

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', shiftKey: false });
    component.onKeyDown(enterEvent);
    expect(sendSpy).toHaveBeenCalledTimes(1);
  });

  it('offers a normal link back to Inicio', () => {
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe('/dashboard');
  });

  it('should clear history when clicking clear button', () => {
    chatService.openChat();
    fixture.detectChanges();

    const clearSpy = vi.spyOn(chatService, 'clearHistory');
    const clearBtn = fixture.nativeElement.querySelector('[data-testid="btn-clear-history"]');
    clearBtn.click();

    expect(clearSpy).toHaveBeenCalled();
  });

  it('clears a draft on patient changes without sending it into the new conversation', () => {
    component.inputMessage.set('Borrador paciente A');
    (TestBed.inject(ActivePatientService).activePatient as any).set({id:20});
    chatService.syncContext(); // Service already synchronized, widget effect still pending.
    const send=vi.spyOn(chatService,'sendMessage'); component.onSendMessage();
    expect(send).not.toHaveBeenCalled(); expect(component.inputMessage()).toBe('');
    fixture.detectChanges(); expect(component.inputMessage()).toBe('');
  });

});
