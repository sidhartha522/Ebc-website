import { useState, useEffect, useCallback } from 'react';

const STORAGE_PREFIX = 'ebc_';

function getStorageKey(filename) {
  return `${STORAGE_PREFIX}${filename.replace('.json', '')}`;
}

export function useJsonData(filename) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const storageKey = getStorageKey(filename);
      
      // Check localStorage first (for admin edits)
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Only use localStorage if it actually has data (prevents blank pages)
        const hasData = Array.isArray(parsed) ? parsed.length > 0 : Object.keys(parsed).length > 0;
        if (hasData) {
          setData(parsed);
          setLoading(false);
          return;
        }
      }

      // Fallback to static JSON file
      const response = await fetch(`/data/${filename}`);
      if (!response.ok) throw new Error(`Failed to load ${filename}`);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [filename]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveData = useCallback((newData) => {
    const storageKey = getStorageKey(filename);
    localStorage.setItem(storageKey, JSON.stringify(newData));
    setData(newData);
  }, [filename]);

  const resetToDefault = useCallback(async () => {
    const storageKey = getStorageKey(filename);
    localStorage.removeItem(storageKey);
    await loadData();
  }, [filename, loadData]);

  return { data, loading, error, saveData, resetToDefault, reload: loadData };
}

export function useSettings() {
  return useJsonData('settings.json');
}
