'use client';

export function safeGetItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as unknown;

    return parsed as T;
  } catch (error) {
    console.error(`Failed to parse localStorage key "${key}":`, error);
    return fallback;
  }
}

export function safeSetItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save localStorage key "${key}":`, error);
  }
}