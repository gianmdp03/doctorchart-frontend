import { instantParts } from '../../core/date/user-time-zone';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAlertCircle,
  lucideBot,
  lucideCheck,
  lucideLoader2,
  lucideRotateCcw,
  lucideSend,
  lucideSparkles,
  lucideStethoscope,
  lucideX,
} from '@ng-icons/lucide';
import { AiChatService } from '../../core/services/ai-chat.service';

@Component({
  selector: 'app-ai-assistant-page',
  imports: [
    FormsModule,
    RouterLink,
    NgIcon,
  ],
  providers: [
    provideIcons({
      lucideBot,
      lucideSparkles,
      lucideSend,
      lucideX,
      lucideRotateCcw,
      lucideCheck,
      lucideAlertCircle,
      lucideLoader2,
      lucideStethoscope,
    }),
  ],
  templateUrl: './ai-assistant-page.component.html',
  styleUrl: './ai-assistant-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiAssistantPageComponent implements OnInit, OnDestroy {
  ngOnInit(): void { this.chatService.openChat(); }
  ngOnDestroy(): void { this.chatService.closeChat(); }
  readonly messageTime = (instant: string | Date) => instantParts(instant).time;
  protected readonly chatService = inject(AiChatService);

  private draftRevision = this.chatService.contextRevision();
  readonly inputMessage = signal<string>('');
  readonly messagesContainer =
    viewChild<ElementRef<HTMLDivElement>>('messagesContainer');

  constructor() {
    effect(() => { this.draftRevision = this.chatService.contextRevision(); this.inputMessage.set(''); });
    effect(() => {
      this.chatService.messages();
      this.chatService.isTyping();
      this.chatService.isOpen();

      setTimeout(() => {
        this.scrollToBottom();
      }, 50);
    });
  }

  scrollToBottom(): void {
    const container = this.messagesContainer()?.nativeElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  onSendMessage(): void {
    this.chatService.syncContext();
    if (this.draftRevision !== this.chatService.contextRevision()) { this.inputMessage.set(''); return; }
    const text = this.inputMessage();
    if (!text.trim()) return;

    this.chatService.sendMessage(text);
    this.inputMessage.set('');
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSendMessage();
    }
  }

  onPromptClick(prompt: string): void {
    this.chatService.sendMessage(prompt);
  }

  formatMessageText(text: string): string {
    if (!text) return '';

    let formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    formatted = formatted.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold">$1</strong>',
    );

    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    formatted = formatted.replace(
      /(^|\n)[-*]\s+(.+)/g,
      '$1<div class="flex items-start gap-1.5 my-0.5"><span class="message-list-marker">•</span><span>$2</span></div>',
    );

    formatted = formatted.replace(
      /(^|\n)(\d+)\.\s+(.+)/g,
      '$1<div class="flex items-start gap-1.5 my-0.5"><span class="message-list-marker font-mono text-xs">$2.</span><span>$3</span></div>',
    );

    formatted = formatted.replace(/\n/g, '<br>');

    return formatted;
  }
}
