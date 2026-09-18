import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AiChatService } from './ai-chat.service';
import { environment } from '../../../environments/environment';

describe('AiChatService', () => {
  let service: AiChatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AiChatService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AiChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
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
});
