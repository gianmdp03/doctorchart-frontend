import { WizardFormDefinition, WizardFormValues } from '../../core/models/wizard-definition.model';
import { inputValues, validIsoDate } from './dynamic-form-renderer.component';

export function retainCompatibleValues(previous: WizardFormDefinition, next: WizardFormDefinition, values: WizardFormValues): WizardFormValues {
  const old = new Map(previous.categories.flatMap(category => category.fields).map(field => [field.key, field]));
  return inputValues(next, Object.fromEntries(next.categories.flatMap(category => category.fields).filter(field => {
    const before = old.get(field.key); return before?.type === field.type;
  }).filter(field => Object.prototype.hasOwnProperty.call(values, field.key)).map(field => [field.key, values[field.key]])));
}
export function argentinaDateTime(instant: string): { day: string; time: string } {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(instant));
  const value = (name: string) => parts.find(part => part.type === name)?.value ?? '';
  return { day: `${value('year')}-${value('month')}-${value('day')}`, time: `${value('hour')}:${value('minute')}` };
}
export function encounterInstant(day: string, time: string): string | null {
  if (!validIsoDate(day) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return null;
  return `${day}T${time}:00-03:00`;
}
export function errorMessage(error: unknown, fallback: string): string {
  const message = (error as { error?: { message?: unknown } })?.error?.message;
  return typeof message === 'string' ? message : fallback;
}
export function conflictKind(error: unknown): 'workspace' | 'record' | null {
  const response = error as { status?: number; error?: { code?: string } };
  return response?.status !== 409 ? null : response.error?.code === 'WORKSPACE_VERSION_CONFLICT' ? 'workspace' : response.error?.code === 'VERSION_CONFLICT' ? 'record' : null;
}
