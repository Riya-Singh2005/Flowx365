import { sections } from '../data/sections';

const byId = new Map(sections.map((s) => [s.id, s]));
const bySlug = new Map(sections.map((s) => [s.slug, s]));

/** The section a path like `/how-it-works` names, if any. */
export function sectionForPath(pathname: string) {
  return bySlug.get(pathname.replace(/^\/+|\/+$/g, ''));
}

/**
 * Shows a section's own path in the address bar. Pushes a history entry so
 * Back returns to the previous section. Targets without a path (the skip
 * link's `main`) leave the address alone.
 */
export function showSectionPath(id: string) {
  const s = byId.get(id);
  if (!s) return;
  const path = `/${s.slug}`;
  if (location.pathname !== path || location.hash) history.pushState({ section: id }, '', path + location.search);
}

/** Scrolls to the section the current path names. */
export function scrollToPathSection() {
  const s = sectionForPath(location.pathname);
  document.getElementById(s?.id ?? '')?.scrollIntoView({ block: 'start' });
}
