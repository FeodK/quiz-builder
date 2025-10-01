import { Quiz } from '@/types/quiz';
import { safeGetItem, safeSetItem } from '@/utils/safeStorage';

const STORAGE_KEYS = {
  QUIZZES: 'quizbuilder.quizzes',
  INITIALIZED: 'quizbuilder.initialized',
} as const;

export class StorageService {
  static getQuizzes(): Quiz[] {
    const fallback: Quiz[] = [];
    const data = safeGetItem<unknown[]>(STORAGE_KEYS.QUIZZES, fallback);

    if (!Array.isArray(data)) return fallback;

    return data.filter((item): item is Quiz => {
      return (
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        'title' in item &&
        'blocks' in item &&
        Array.isArray(item.blocks)
      );
    }).map(quiz => ({
      ...quiz,
      blocks: Array.isArray(quiz.blocks) ? quiz.blocks : [],
      createdAt: new Date(quiz.createdAt),
      updatedAt: new Date(quiz.updatedAt),
    }));
  }

  static saveQuizzes(quizzes: Quiz[]): void {
    safeSetItem(STORAGE_KEYS.QUIZZES, quizzes);
  }

  static isInitialized(): boolean {
    return safeGetItem<boolean>(STORAGE_KEYS.INITIALIZED, false);
  }

  static markAsInitialized(): void {
    safeSetItem(STORAGE_KEYS.INITIALIZED, true);
  }

  static clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.QUIZZES);
    localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
  }
}