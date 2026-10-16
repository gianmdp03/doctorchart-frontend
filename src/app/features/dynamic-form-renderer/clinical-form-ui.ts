import { instantParts } from '../../core/date/user-time-zone';
import { WizardFormDefinition, WizardFormValues } from '../../core/models/wizard-definition.model';
import { inputValues } from './dynamic-form-renderer.component';

export function retainCompatibleValues(previous: WizardFormDefinition, next: WizardFormDefinition, values: WizardFormValues): WizardFormValues {
  const old = new Map(previous.categories.flatMap(category => category.fields).map(field => [field.key, field]));
  return inputValues(next, Object.fromEntries(next.categories.flatMap(category => category.fields).filter(field => {
    const before = old.get(field.key); return before?.type === field.type;
  }).filter(field => Object.prototype.hasOwnProperty.call(values, field.key)).map(field => [field.key, values[field.key]])));
}
export const userDateTime = instantParts;
export function errorMessage(error: unknown, fallback: string): string {
  const message = (error as { error?: { message?: unknown } })?.error?.message;
  return typeof message === 'string' ? message : fallback;
}
export function conflictKind(error: unknown): 'workspace' | 'record' | null {
  const response = error as { status?: number; error?: { code?: string } };
  return response?.status !== 409 ? null : response.error?.code === 'WORKSPACE_VERSION_CONFLICT' ? 'workspace' : response.error?.code === 'VERSION_CONFLICT' ? 'record' : null;
}
