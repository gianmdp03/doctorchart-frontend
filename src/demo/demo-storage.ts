import { DAY, DemoSession, newDemoUuid } from './demo-data';

export interface StoredDemoSession {
  session: DemoSession;
  expiresAt: number;
  revision: string;
}

export class DemoStorage {
  private databasePromise?: Promise<IDBDatabase>;

  private getDatabase(): Promise<IDBDatabase> {
    if (!this.databasePromise) {
      this.databasePromise =
        typeof indexedDB === 'undefined'
          ? Promise.reject(new Error('IndexedDB no está disponible en este entorno.'))
          : new Promise<IDBDatabase>((resolve, reject) => {
              const request = indexedDB.open('demochart', 1);
              request.onupgradeneeded = () => {
                if (!request.result.objectStoreNames.contains('session')) {
                  request.result.createObjectStore('session');
                }
              };
              request.onsuccess = () => resolve(request.result);
              request.onerror = () => reject(new Error('No se pudo abrir el almacenamiento de DemoChart.'));
            });
    }
    return this.databasePromise;
  }

  load(): Promise<StoredDemoSession | undefined> {
    return this.transact((store, found) => {
      if (found && found.expiresAt <= Date.now()) {
        store.delete('current');
        return undefined;
      }
      return found;
    });
  }

  save(session: DemoSession, previous: StoredDemoSession | undefined, renew = false): Promise<StoredDemoSession> {
    return this.transact((store, found) => {
      if (found?.revision !== previous?.revision || (found && found.expiresAt <= Date.now())) {
        throw new Error('La sesión cambió o venció. Recargá DemoChart antes de seguir.');
      }
      const next: StoredDemoSession = {
        session,
        revision: newDemoUuid(),
        expiresAt: renew || !found ? Date.now() + DAY : found.expiresAt,
      };
      store.put(next, 'current');
      return next;
    });
  }

  clear(): Promise<void> {
    return this.transact((store) => {
      store.delete('current');
    });
  }

  private async transact<T>(fn: (store: IDBObjectStore, found: StoredDemoSession | undefined) => T): Promise<T> {
    const db = await this.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('session', 'readwrite');
      const store = transaction.objectStore('session');
      let result: T;
      let error: unknown;
      const request = store.get('current');
      request.onsuccess = () => {
        try {
          result = fn(store, request.result as StoredDemoSession | undefined);
        } catch (failure) {
          error = failure;
          transaction.abort();
        }
      };
      transaction.oncomplete = () => resolve(result);
      transaction.onabort = () => reject(error ?? new Error('No se pudo guardar la sesión en este navegador.'));
    });
  }
}
