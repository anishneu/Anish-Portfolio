import { useCallback, useEffect, useState } from 'react';
import { getNextImageSrc } from '../utils/imageUtils';

/**
 * Image src with automatic jpg ↔ png fallback, then optional remote fallback.
 */
export function useRasterImageSrc(initialSrc, remoteFallback = null) {
  const [src, setSrc] = useState(initialSrc);

  useEffect(() => {
    setSrc(initialSrc);
  }, [initialSrc]);

  const onError = useCallback(() => {
    setSrc((prev) => getNextImageSrc(prev, remoteFallback) ?? prev);
  }, [remoteFallback]);

  return { src, onError };
}
