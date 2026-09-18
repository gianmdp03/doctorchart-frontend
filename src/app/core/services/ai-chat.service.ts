import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface AiChatResponse {
  response: string;
}

export const INITIAL_ASSISTANT_MESSAGE: ChatMessage = {
  id: 'msg-init',
  sender: 'assistant',
  text: '¡Hola! Soy **DoctorChart Copilot**, tu asistente pediátrico clínico con inteligencia artificial. Puedo asistirte en la interpretación de curvas de crecimiento, percentiles OMS, hitos del desarrollo psicomotor y resumen clínico de pacientes. ¿En qué puedo ayudarte hoy?',
  timestamp: new Date(),
};

@Injectable({
  providedIn: 'root',
})
export class AiChatService {
  private readonly http = inject(HttpClient);

  readonly isOpen = signal<boolean>(false);
  readonly isTyping = signal<boolean>(false);
  readonly messages = signal<ChatMessage[]>([INITIAL_ASSISTANT_MESSAGE]);
  readonly hasUnread = signal<boolean>(false);

  readonly suggestedPrompts: string[] = [
    'Interpretar percentil de peso/edad',
    'Hitos madurativos a los 12 meses',
    'Resumen de últimos controles',
    '¿Cómo registrar antecedentes perinatales?',
  ];

  toggleChat(): void {
    const next = !this.isOpen();
    this.isOpen.set(next);
    if (next) {
      this.hasUnread.set(false);
    }
  }

  openChat(): void {
    this.isOpen.set(true);
    this.hasUnread.set(false);
  }

  closeChat(): void {
    this.isOpen.set(false);
  }

  clearHistory(): void {
    this.messages.set([
      {
        ...INITIAL_ASSISTANT_MESSAGE,
        id: 'msg-' + Date.now(),
        timestamp: new Date(),
      },
    ]);
  }

  sendMessage(userText: string): void {
    const trimmed = userText.trim();
    if (!trimmed || this.isTyping()) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date(),
    };

    this.messages.update((prev) => [...prev, userMsg]);
    this.isTyping.set(true);

    this.http
      .post<AiChatResponse>(environment.aiGatewayUrl, { message: trimmed })
      .subscribe({
        next: (res) => {
          this.isTyping.set(false);
          const botMsg: ChatMessage = {
            id: 'bot-' + Date.now(),
            sender: 'assistant',
            text: res?.response || 'No se recibió una respuesta clínica del asistente.',
            timestamp: new Date(),
          };
          this.messages.update((prev) => [...prev, botMsg]);
          if (!this.isOpen()) {
            this.hasUnread.set(true);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isTyping.set(false);
          let errorText =
            'No fue posible procesar la consulta clínica en este momento. Por favor, intente nuevamente en unos instantes.';

          if (err.status === 0) {
            errorText =
              'No se pudo establecer conexión con el asistente clínico de DoctorChart. Verifique su conexión o intente más tarde.';
          } else if (err.status === 429) {
            errorText =
              'Ha alcanzado el límite de consultas clínicas permitidas por ahora. Por favor, espere unos minutos antes de volver a consultar.';
          } else if (err.status === 401 || err.status === 403) {
            errorText =
              'Su sesión ha expirado o requiere iniciar sesión para consultar al asistente de DoctorChart.';
          } else if (err.status >= 500) {
            errorText =
              'El servicio de inteligencia artificial pediátrica experimenta demoras técnicas. Por favor, reintente en unos instantes.';
          } else {
            const rawMsg =
              (typeof err.error === 'string' ? err.error : null) ||
              err.error?.error ||
              err.error?.message;

            const isTechnical =
              typeof rawMsg === 'string' &&
              /network|fetch|http failure|status|stack|panic|econnrefused|enotfound|exception|syntaxerror|typeerror/i.test(
                rawMsg
              );

            if (typeof rawMsg === 'string' && rawMsg.trim() && !isTechnical) {
              errorText = rawMsg;
            }
          }

          const errorMsg: ChatMessage = {
            id: 'err-' + Date.now(),
            sender: 'assistant',
            text: errorText,
            timestamp: new Date(),
            isError: true,
          };
          this.messages.update((prev) => [...prev, errorMsg]);
          if (!this.isOpen()) {
            this.hasUnread.set(true);
          }
        },
      });
  }
}
