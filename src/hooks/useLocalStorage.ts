'use client';

import { useState, useEffect } from 'react';
import { safeGetItem, safeSetItem } from '@/utils/safeStorage';

export function useLocalStorage<T>(key: string, fallback: T) {
  const [storedValue, setStoredValue] = useState<T>(() => safeGetItem<T>(key, fallback));

  useEffect(() => {
    setStoredValue(safeGetItem<T>(key, fallback));
  }, [key, fallback]);

  const setValue = (value: T | ((prev: T) => T)) => {
    const newValue = value instanceof Function ? value(storedValue) : value;
    setStoredValue(newValue);
    safeSetItem(key, newValue);
  };

  return [storedValue, setValue] as const;
}