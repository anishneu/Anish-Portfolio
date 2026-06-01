/** Matches .jpg, .jpeg, or .png (optional query string). */
const JPEG_PATTERN = /\.jpe?g(\?.*)?$/i;
const PNG_PATTERN = /\.png(\?.*)?$/i;

/** Swap between JPEG and PNG for the same asset path. */
export function getAlternateRasterSrc(src) {
  if (!src || typeof src !== 'string') return null;
  if (JPEG_PATTERN.test(src)) return src.replace(JPEG_PATTERN, '.png$1');
  if (PNG_PATTERN.test(src)) return src.replace(PNG_PATTERN, '.jpg$1');
  return null;
}

/**
 * Resolve the next URL when an image fails to load:
 * jpg/jpeg ↔ png, then optional remote fallback.
 */
export function getNextImageSrc(currentSrc, remoteFallback) {
  const alternate = getAlternateRasterSrc(currentSrc);
  if (alternate && alternate !== currentSrc) return alternate;
  if (remoteFallback && currentSrc !== remoteFallback) return remoteFallback;
  return null;
}
