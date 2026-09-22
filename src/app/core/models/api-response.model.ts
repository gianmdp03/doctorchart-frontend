export interface PagedResponse<T> {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
  page?: {
    size?: number;
    number?: number;
    totalElements?: number;
    totalPages?: number;
  };
}

export function getTotalElements<T>(res: PagedResponse<T> | null | undefined): number {
  if (!res) return 0;
  if (typeof res.totalElements === 'number') return res.totalElements;
  if (typeof res.page?.totalElements === 'number') return res.page.totalElements;
  if (Array.isArray(res.content)) return res.content.length;
  return 0;
}

export function getTotalPages<T>(res: PagedResponse<T> | null | undefined): number {
  if (!res) return 1;
  if (typeof res.totalPages === 'number') return res.totalPages;
  if (typeof res.page?.totalPages === 'number') return res.page.totalPages;
  return 1;
}

export interface ProblemDetail {
  type?: string;
  title?: string;
  status: number;
  detail?: string;
  instance?: string;
  invalidFields?: Record<string, string>;
  timestamp?: string;
}
