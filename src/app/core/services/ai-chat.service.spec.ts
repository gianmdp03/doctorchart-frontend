import { signal } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivePatientService } from './active-patient.service';
import { WorkspaceStore } from './workspace.store';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AiChatService } from './ai-chat.service';
import { environment } from '../../../environments/environment';
import { FEATURE_FLAGS } from '../config/feature-flags';

describe('AiChatService', () => {
  let service: AiChatService;
  let httpMock: HttpTestingController;
  let aiEnabled: ReturnType<typeof signal<boolean>>;
  let specialtyCode: ReturnType<typeof signal<string>>;

  beforeEach(() => {
    FEATURE_FLAGS.AI_ASSISTANT_ENABLED = true; // Exercise the preserved implementation.
    aiEnabled = signal(true);
    specialtyCode = signal('pediatrics');
    TestBed.configureTestingModule({
      providers: [
        AiChatService,
        {provide: WorkspaceStore, useValue: {specialtyCode, activeModules: () => ({AI_ASSISTANT: aiEnabled()}), isModuleActive: () => aiEnabled()}},
        {provide: AuthService, useValue: {currentUser: signal({id: 'doctor-a'})}},
        {provide: ActivePatientService, useValue: {activePatient: signal(null)}},
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AiChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    FEATURE_FLAGS.AI_ASSISTANT_ENABLED = false;
    httpMock.verify();
  });

  it('blocks opening and HTTP calls even with an active clinical module', () => {
    FEATURE_FLAGS.AI_ASSISTANT_ENABLED = false;
    service.openChat();
    service.toggleChat();
    service.sendMessage('synthetic prompt');
    expect(service.isOpen()).toBe(false);
    expect(service.isTyping()).toBe(false);
    httpMock.expectNone(environment.aiGatewayUrl);
  });

  it('should be created and have initial state', () => {
    expect(service).toBeTruthy();
    expect(service.isOpen()).toBe(false);
    expect(service.isTyping()).toBe(false);
    expect(service.hasUnread()).toBe(false);
    expect(service.messages().length).toBe(1);
    expect(service.messages()[0].sender).toBe('assistant');
    expect(service.messages()[0].text).toContain('DoctorChart Copilot');
    expect(service.suggestedPrompts.length).toBeGreaterThan(0);
  });

  it('should toggle and control chat open state', () => {
    service.openChat();
    expect(service.isOpen()).toBe(true);
    expect(service.hasUnread()).toBe(false);

    service.closeChat();
    expect(service.isOpen()).toBe(false);

    service.toggleChat();
    expect(service.isOpen()).toBe(true);

    service.toggleChat();
    expect(service.isOpen()).toBe(false);
  });

  it('should clear history and restore original clinical welcome message', () => {
    service.sendMessage('Hola');
    const req = httpMock.expectOne(environment.aiGatewayUrl);
    req.flush({ response: 'Respuesta' });

    expect(service.messages().length).toBeGreaterThan(1);

    service.clearHistory();
    expect(service.messages().length).toBe(1);
    expect(service.messages()[0].sender).toBe('assistant');
    expect(service.messages()[0].text).toContain('DoctorChart Copilot');
  });

  it('should not send message if text is empty or blank', () => {
    service.sendMessage('   ');
    httpMock.expectNone(environment.aiGatewayUrl);
    expect(service.messages().length).toBe(1);
  });

  it('should not send message if already typing', () => {
    service.sendMessage('Primera');
    const req = httpMock.expectOne(environment.aiGatewayUrl);
    expect(service.isTyping()).toBe(true);

    service.sendMessage('Segunda');
    httpMock.expectNone(environment.aiGatewayUrl);

    req.flush({ response: 'Ok' });
    expect(service.isTyping()).toBe(false);
  });

  it('should send message to aiGatewayUrl and receive response', () => {
    const userPrompt = 'Interpretar percentil de peso/edad';
    service.sendMessage(userPrompt);

    expect(service.isTyping()).toBe(true);
    expect(service.messages().some((m) => m.text === userPrompt && m.sender === 'user')).toBe(true);

    const req = httpMock.expectOne(environment.aiGatewayUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ message: userPrompt });

    req.flush({ response: 'El percentil 50 indica adecuado desarrollo ponderal.' });

    expect(service.isTyping()).toBe(false);
    const lastMsg = service.messages().at(-1);
    expect(lastMsg?.sender).toBe('assistant');
    expect(lastMsg?.text).toBe('El percentil 50 indica adecuado desarrollo ponderal.');
    expect(lastMsg?.isError).toBeFalsy();
  });

  it('should handle HTTP 429 rate limit error gracefully in assistant bubble', () => {
    service.sendMessage('Pregunta');
    const req = httpMock.expectOne(environment.aiGatewayUrl);

    req.flush(
      { error: 'Rate limit reached' },
      { status: 429, statusText: 'Too Many Requests' }
    );

    expect(service.isTyping()).toBe(false);
    const lastMsg = service.messages().at(-1);
    expect(lastMsg?.sender).toBe('assistant');
    expect(lastMsg?.isError).toBe(true);
    expect(lastMsg?.text).toContain('límite de consultas');
  });

  it('should handle HTTP 401 and 403 authorization error gracefully', () => {
    service.sendMessage('Pregunta de auth');
    const req = httpMock.expectOne(environment.aiGatewayUrl);

    req.flush(
      { error: 'Unauthorized' },
      { status: 401, statusText: 'Unauthorized' }
    );

    expect(service.isTyping()).toBe(false);
    const lastMsg = service.messages().at(-1);
    expect(lastMsg?.sender).toBe('assistant');
    expect(lastMsg?.isError).toBe(true);
    expect(lastMsg?.text).toContain('sesión ha expirado');
  });

  it('should handle HTTP 500 server error gracefully with a friendly clinical message', () => {
    service.sendMessage('Pregunta');
    const req = httpMock.expectOne(environment.aiGatewayUrl);

    req.flush(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal Server Error' }
    );

    expect(service.isTyping()).toBe(false);
    const lastMsg = service.messages().at(-1);
    expect(lastMsg?.sender).toBe('assistant');
    expect(lastMsg?.isError).toBe(true);
    expect(lastMsg?.text).toContain('demoras técnicas');
  });

  it('should handle status 0 network error gracefully with a friendly message', () => {
    service.sendMessage('Pregunta con red caída');
    const req = httpMock.expectOne(environment.aiGatewayUrl);

    req.error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' });

    expect(service.isTyping()).toBe(false);
    const lastMsg = service.messages().at(-1);
    expect(lastMsg?.sender).toBe('assistant');
    expect(lastMsg?.isError).toBe(true);
    expect(lastMsg?.text).toContain('No se pudo establecer conexión');
  });

  it('should handle custom safe error messages from backend', () => {
    service.sendMessage('Pregunta con error validado');
    const req = httpMock.expectOne(environment.aiGatewayUrl);

    req.flush(
      { error: 'El paciente seleccionado no posee controles pediátricos previos.' },
      { status: 400, statusText: 'Bad Request' }
    );

    expect(service.isTyping()).toBe(false);
    const lastMsg = service.messages().at(-1);
    expect(lastMsg?.sender).toBe('assistant');
    expect(lastMsg?.isError).toBe(true);
    expect(lastMsg?.text).toBe('El paciente seleccionado no posee controles pediátricos previos.');
  });

  it('should set hasUnread to true if response arrives when chat is closed', () => {
    expect(service.isOpen()).toBe(false);

    service.sendMessage('Consulta');
    const req = httpMock.expectOne(environment.aiGatewayUrl);
    req.flush({ response: 'Respuesta pediátrica' });

    expect(service.hasUnread()).toBe(true);

    service.openChat();
    expect(service.hasUnread()).toBe(false);
  });

  it('cancels an old conversation on patient changes and preserves the gateway contract', () => {
    service.sendMessage('Consulta paciente A');
    const first = httpMock.expectOne(environment.aiGatewayUrl);
    expect(first.request.body).toEqual({message:'Consulta paciente A'});
    (TestBed.inject(ActivePatientService).activePatient as any).set({id:20}); TestBed.tick();
    expect(first.cancelled).toBe(true); expect(service.messages()).toHaveLength(1); expect(service.isTyping()).toBe(false);
    service.sendMessage('Consulta paciente B'); httpMock.expectOne(environment.aiGatewayUrl).flush({response:'Respuesta B'});
    expect(service.messages().map(message=>message.text).join(' ')).not.toContain('Consulta paciente A');
  });
  it('does not display a response after an account change before the context effect runs', () => {
    service.sendMessage('Consulta'); const pending=httpMock.expectOne(environment.aiGatewayUrl);
    TestBed.inject(AuthService).currentUser.set({id:'doctor-b'} as any); pending.flush({response:'Vieja'});
    expect(service.messages().some(message=>message.text==='Vieja')).toBe(false);
    TestBed.tick(); expect(service.messages()).toHaveLength(1);
  });
  it('cancels pending requests when clearing history and permits a new conversation immediately', () => {
    service.sendMessage('Anterior'); const first=httpMock.expectOne(environment.aiGatewayUrl);
    service.clearHistory(); expect(first.cancelled).toBe(true); expect(service.isTyping()).toBe(false);
    service.sendMessage('Nueva'); httpMock.expectOne(environment.aiGatewayUrl).flush({response:'Nueva respuesta'});
    expect(service.messages()).toHaveLength(3);
  });
  it('clears chat on logout and does not send unauthenticated prompts', () => {
    service.sendMessage('Anterior'); const first=httpMock.expectOne(environment.aiGatewayUrl);
    TestBed.inject(AuthService).currentUser.set(null); TestBed.tick();
    expect(first.cancelled).toBe(true); expect(service.messages()).toHaveLength(1);
    service.sendMessage('Nueva'); httpMock.expectNone(environment.aiGatewayUrl);
  });
  it('rejects prompts and opening the chat when its personal module is disabled', () => {
    aiEnabled.set(false); TestBed.tick();
    service.openChat(); service.toggleChat(); service.sendMessage('Consulta');
    expect(service.isOpen()).toBe(false); expect(service.messages()).toHaveLength(1);
    httpMock.expectNone(environment.aiGatewayUrl);
  });
  it('cancels a conversation when AI availability is removed', () => {
    service.openChat(); service.sendMessage('Consulta'); const pending=httpMock.expectOne(environment.aiGatewayUrl);
    aiEnabled.set(false); TestBed.tick();
    expect(pending.cancelled).toBe(true); expect(service.isTyping()).toBe(false);
    expect(service.isOpen()).toBe(false); expect(service.messages()).toHaveLength(1);
  });
  it('discards a response after AI is disabled even before the reactive cleanup runs', () => {
    service.sendMessage('Consulta'); const pending=httpMock.expectOne(environment.aiGatewayUrl);
    aiEnabled.set(false); pending.flush({response:'Respuesta anterior'});
    expect(service.messages().some(message=>message.text==='Respuesta anterior')).toBe(false);
    TestBed.tick(); expect(service.messages()).toHaveLength(1);
  });
  it('retains the conversation when the same patient is refreshed', () => {
    (TestBed.inject(ActivePatientService).activePatient as any).set({id:10}); TestBed.tick();
    service.sendMessage('Consulta'); httpMock.expectOne(environment.aiGatewayUrl).flush({response:'Respuesta'});
    (TestBed.inject(ActivePatientService).activePatient as any).set({id:10, fullName:'Actualizado'}); TestBed.tick();
    expect(service.messages()).toHaveLength(3);
  });

  it('discards the previous specialty conversation even if AI remains enabled', () => {
    service.sendMessage('Consulta anterior'); const pending=httpMock.expectOne(environment.aiGatewayUrl);
    specialtyCode.set('custom'); TestBed.tick();
    expect(pending.cancelled).toBe(true);expect(service.messages()).toHaveLength(1);
    service.sendMessage('Consulta nueva');httpMock.expectOne(environment.aiGatewayUrl).flush({response:'Nueva especialidad'});
    expect(service.messages().some(message=>message.text==='Consulta anterior')).toBe(false);
  });

});
