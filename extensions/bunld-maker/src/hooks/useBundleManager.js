import { useState, useEffect, useCallback } from 'react';
import {
  fetchBundleMetaobject,
  createBundleMetaobject,
  updateBundleMetaobject,
  attachMetaobjectToProduct,
} from '../utils';

export function useBundleManager(productId, metafieldKey = 'bundle', refresh) {
  const [bundleData, setBundleDataState] = useState([]);
  const [metaobjectId, setMetaobjectId] = useState(null);
  const [status, setStatus] = useState({
    loading: true,
    error: null,
    initialized: false,
  });

  useEffect(() => {
    const initialize = async () => {
      if (!productId) {
        setStatus({ loading: false, error: null, initialized: true });
        return;
      }
      setStatus({ loading: true, error: null, initialized: false });
      try {
        const { bundleEntries, metaobjectId } = await fetchBundleMetaobject(
          productId,
          metafieldKey
        );
        setBundleDataState(bundleEntries);
        setMetaobjectId(metaobjectId);
        setStatus({ loading: false, error: null, initialized: true });
      } catch (err) {
        setStatus({ loading: false, error: 'Failed to load bundle', initialized: true });
      }
    };
    initialize();
  }, [productId, metafieldKey]);

  const saveBundle = useCallback(
    async (entries) => {
      if (!productId) return;
      setStatus(prev => ({ ...prev, loading: true, error: null }));
      try {
        let moId = metaobjectId;
        if (!moId) {
          moId = await createBundleMetaobject(entries);
          await attachMetaobjectToProduct(productId, metafieldKey, moId);
        } else {
          await updateBundleMetaobject(moId, entries);
        }
        setMetaobjectId(moId);
        setBundleDataState(entries);
        if (refresh) refresh();
        setStatus(prev => ({ ...prev, loading: false, error: null }));
      } catch {
        setStatus(prev => ({ ...prev, loading: false, error: 'Failed to save bundle' }));
      }
    },
    [productId, metafieldKey, metaobjectId, refresh]
  );

  return {
    bundleData,
    setBundleData: saveBundle,
    loading: status.loading && !status.initialized,
    error: status.error,
  };
}
