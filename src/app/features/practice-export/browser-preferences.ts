import type { BrowserUiStorageService } from '../../core/services/browser-ui-storage.service';

function object(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error('Borrador inválido');
  return value as Record<string, unknown>;
}

function string(value: unknown): string {
  if (typeof value !== 'string') throw new Error('Borrador inválido');
  return value;
}

function list(value: unknown): unknown[] {
  if (!Array.isArray(value)) throw new Error('Borrador inválido');
  return value;
}

function integer(value: unknown): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value)) throw new Error('Borrador inválido');
  return value;
}

function identifier(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  const id = string(value);
  if (!/^[1-9][0-9]{0,18}$/.test(id)) throw new Error('Borrador inválido');
  return id;
}

function ranges(value: unknown) {
  return list(value).map(item => {
    const range = object(item);
    return {
      id: identifier(range['id']),
      specialtyContextId: identifier(range['specialtyContextId']),
      slotMinutes: range['slotMinutes'] == null ? undefined : integer(range['slotMinutes']),
      start: string(range['start']),
      end: string(range['end']),
    };
  });
}

function scheduleDraft(serialized: string, clinicId: string) {
  const saved = object(JSON.parse(serialized));
  const version = string(saved['version']);
  if (!/^[0-9]{1,19}$/.test(version)) throw new Error('Borrador inválido');
  const draft = object(saved['draft']);
  return {
    clinicId,
    version,
    draft: {
      minNoticeMinutes: draft['minNoticeMinutes'] == null ? null : integer(draft['minNoticeMinutes']),
      maxAdvanceDays: draft['maxAdvanceDays'] == null ? null : integer(draft['maxAdvanceDays']),
      weekly: list(draft['weekly']).map(item => {
        const day = object(item);
        return { weekday: integer(day['weekday']), ranges: ranges(day['ranges']) };
      }),
      exceptions: list(draft['exceptions']).map(item => {
        const exception = object(item);
        return {
          id: identifier(exception['id']),
          from: string(exception['from']),
          through: string(exception['through']),
          label: string(exception['label']),
          ranges: ranges(exception['ranges']),
        };
      }),
    },
  };
}

export function browserPreferences(storage: BrowserUiStorageService, owner: string, contextId: number | null) {
  const scheduleDrafts = storage.listScheduleDrafts(owner).flatMap(({ clinicId, serialized }) => {
    try {
      return [scheduleDraft(serialized, clinicId)];
    } catch {
      // The schedule editor also treats unreadable session drafts as unavailable.
      return [];
    }
  });
  return {
    theme: storage.readTheme(),
    fontSize: storage.readFontSize(),
    selectedContextId: contextId === null ? undefined : String(contextId),
    scheduleDrafts,
  };
}
