import { useState, useEffect, useCallback } from 'react';
import { readBin, writeBin } from '../services/jsonbinService';

export function useJsonData(filename) {
  const [data,      setData]      = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await readBin(filename);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filename]);

  useEffect(() => { loadData(); }, [loadData]);

  // Admin saves → writes to JSONBin cloud → all users see the new data
  const saveData = useCallback(async (newData) => {
    setData(newData);       // instant UI update
    setSaving(true);
    setSaveError(null);
    try {
      await writeBin(filename, newData);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  }, [filename]);

  return { data, loading, error, saving, saveError, saveData, reload: loadData };
}

export function useSettings() {
  return useJsonData('settings.json');
}
