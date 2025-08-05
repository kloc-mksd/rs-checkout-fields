import { useState, useCallback, useEffect } from 'react';
import { fetchCountries, updateCountries } from '../utils';

export const useCountriesManager = (orderId, refresh) => {
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState({
    loading: true, 
    error: null,
    initialized: false
  });
  const [newSelection, setNewSelection] = useState('select');

  useEffect(() => {
    const initializeCountries = async () => {
      if (!orderId) {
        setStatus(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        const res = await fetchCountries(orderId);
        const order = res?.data?.order || null;
        if (!order) {
          // rerun for the fetchCountries this time don't go for await
          setStatus(prev => ({ ...prev, loading: false }));
          return;
        }

        const existing = res?.data?.order?.metafield?.jsonValue || null;
        
        setCountries(Array.isArray(existing) ? existing : []);

        setStatus({
          loading: false,
          error: null,
          initialized: true
        });
      } catch (err) {
        setStatus({
          loading: false,
          error: 'Failed to load initial countries',
          initialized: true
        });
      }
    }; 
    initializeCountries();
  }, [orderId]);

  const addCountry = useCallback(async (country) => {
    if (!country) return;
    setStatus(prev => ({ ...prev, loading: true, error: null }));
    try {
      const newCountries = [...countries, country];
      await updateCountries(orderId, newCountries);
      setCountries(newCountries);
      setNewSelection('');
      if (refresh) refresh();
      setStatus(prev => ({ ...prev, loading: false, error: null }));
    } catch (err) {
      setStatus(prev => ({ ...prev, loading: false, error: 'Failed to save changes' }));
    }
  }, [orderId, countries, refresh]);

  const removeCountry = useCallback(async (country) => {
    setStatus(prev => ({ ...prev, loading: true, error: null }));
    try {
      const newCountries = countries.filter(c => c !== country);
      await updateCountries(orderId, newCountries);
      setCountries(newCountries);
      if (refresh) refresh();
      setStatus(prev => ({ ...prev, loading: false, error: null }));
    } catch (err) {
      setStatus(prev => ({ ...prev, loading: false, error: 'Failed to save changes' }));
    }
  }, [orderId, countries, refresh]);

  return {
    selectedList: countries,
    newSelection,
    loading: status.loading && !status.initialized,
    error: status.error,
    addCountry,
    removeCountry,
    setNewSelection
  };
};
