/**
 * Scroll offsets per history entry (location.key), recorded by ScrollManager
 * and restored on back/forward. Index reads it too: a page being restored must
 * mount all of its sections at once, or the saved offset is out of reach.
 */
export const scrollPositions = new Map<string, number>();

export const hasSavedScroll = (key: string) => scrollPositions.has(key);

/** Lets in-page navigation (navbar links on the home page) ask for every section. */
export const MOUNT_ALL_EVENT = "home:mount-all";
