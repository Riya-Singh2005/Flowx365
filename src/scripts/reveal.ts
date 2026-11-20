// Prepare reveals before the page opts into enhanced styles. If this module
// cannot initialize, the root never receives `.js` and all content stays
// visible in its unenhanced layout.
export function initReveals() {
  const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.setAttribute('data-visible', ''));
    return;
  }

  const createObserver = (rootMargin: string) => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', '');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin },
    );
    return observer;
  };

  // Incoming sections reveal as soon as their box reaches the viewport edge.
  // The protected local sections keep their established, slightly later cue.
  const incomingObserver = createObserver('0px 0px 24px 0px');
  const localObserver = createObserver('0px 0px -10% 0px');

  items.forEach((el) => {
    const preserveLocalTiming = el.closest('#security, #products, #chain');
    (preserveLocalTiming ? localObserver : incomingObserver).observe(el);
  });
}
