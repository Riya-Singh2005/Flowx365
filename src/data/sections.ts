// Homepage sections that have their own address. Clicking a navigation link
// scrolls to the section and shows its path (example.com/how-it-works);
// opening that path loads the homepage and scrolls to the section.
// `chapter` marks the numbered chapters listed in the Contents manifest.
export const sections: { id: string; slug: string; label: string; chapter?: boolean }[] = [
  { id: 'what', slug: 'what-it-is', label: 'What it is', chapter: true },
  { id: 'products', slug: 'products', label: 'Products' },
  { id: 'chain', slug: 'how-it-works', label: 'How it works', chapter: true },
  { id: 'product', slug: 'leads', label: 'Leads', chapter: true },
  { id: 'tracker', slug: 'quotes-to-orders', label: 'Quotes to orders', chapter: true },
  { id: 'stock', slug: 'purchase-and-stock', label: 'Purchase & stock', chapter: true },
  { id: 'print', slug: 'printing', label: 'Printing', chapter: true },
  { id: 'day', slug: 'a-day', label: 'A day', chapter: true },
  { id: 'questions', slug: 'questions', label: 'Questions', chapter: true },
  { id: 'details', slug: 'details', label: 'Details', chapter: true },
];

/**
 * The href for a homepage section. On the homepage it is the in-page
 * `#fragment` (Base.astro turns the click into a scroll plus the section's
 * path); on any other page it is the section's own path, which loads the
 * homepage and scrolls there.
 */
export function sectionHref(id: string, onHome = true): string {
  if (onHome) return `#${id}`;
  const s = sections.find((x) => x.id === id);
  return s ? `/${s.slug}` : `/#${id}`;
}
