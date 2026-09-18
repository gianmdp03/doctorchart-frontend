import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AiAssistantWidgetComponent } from './ai-assistant-widget.component';
import { AiChatService } from '../../core/services/ai-chat.service';

describe('AiAssistantWidgetComponent', () => {
  let component: AiAssistantWidgetComponent;
  let fixture: ComponentFixture<AiAssistantWidgetComponent>;
  let chatService: AiChatService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiAssistantWidgetComponent],
      providers: [
        AiChatService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AiAssistantWidgetComponent);
    component = fixture.componentInstance;
    chatService = TestBed.inject(AiChatService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render FAB when chat is closed and dialog when chat is open', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(chatService.isOpen()).toBe(false);
    expect(el.querySelector('[data-testid="fab-trigger"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="chat-dialog"]')).toBeNull();

    chatService.openChat();
    fixture.detectChanges();

    expect(el.querySelector('[data-testid="fab-trigger"]')).toBeNull();
    expect(el.querySelector('[data-testid="chat-dialog"]')).toBeTruthy();
  });

  it('should display unread ping dot when hasUnread is true', () => {
    chatService.hasUnread.set(true);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('[data-testid="unread-ping"]')).toBeTruthy();
  });

  it('should format markdown text correctly', () => {
    const boldText = component.formatMessageText('Evaluar **curva OMS**');
    expect(boldText).toContain('<strong class="text-zinc-100 font-semibold">curva OMS</strong>');

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

  it('should close chat when clicking close button', () => {
    chatService.openChat();
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector('[data-testid="btn-close-chat"]');
    closeBtn.click();
    fixture.detectChanges();

    expect(chatService.isOpen()).toBe(false);
  });

  it('should clear history when clicking clear button', () => {
    chatService.openChat();
    fixture.detectChanges();

    const clearSpy = vi.spyOn(chatService, 'clearHistory');
    const clearBtn = fixture.nativeElement.querySelector('[data-testid="btn-clear-history"]');
    clearBtn.click();

    expect(clearSpy).toHaveBeenCalled();
  });
});
