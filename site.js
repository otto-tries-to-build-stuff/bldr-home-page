// Scroll effects shared by every page. Each part runs only if its section is on the page,
// and nothing moves when the visitor has "reduce motion" turned on.
(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---------- promo video plays only while on screen ----------
  const promo = document.getElementById('promo');
  if (promo && !still) new IntersectionObserver(([e]) => { e.isIntersecting ? promo.play().catch(() => {}) : promo.pause(); }).observe(promo);

  // ---------- story: the pinned phone shows the step in the middle of the screen ----------
  const frame = document.getElementById('frame');
  if (frame) {
    const scrs = $$('.scr'), dots = $$('.progress i');
    const stepObs = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      const n = +e.target.dataset.step;
      scrs.forEach((s, i) => s.classList.toggle('on', i === n));
      dots.forEach((d, i) => d.classList.toggle('on', i <= n));
    }), { rootMargin: '-45% 0px -45% 0px' });
    $$('.steps li').forEach(li => stepObs.observe(li));

    // The phone is drawn at 360×720 and zoomed: on phones it shares the top of the screen with the steps.
    const sizeFrame = () => {
      const h = innerWidth >= 960 ? Math.min(innerHeight * .82, 720) : Math.min(innerHeight * .36, 320);
      frame.style.setProperty('--z', (h / 720).toFixed(3));
    };
    sizeFrame();
    addEventListener('resize', sizeFrame);
  }

  // ---------- the closing B rebuilds each time it comes into view ----------
  const buildObs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.remove('build'); void e.target.getBoundingClientRect(); e.target.classList.add('build'); }
  }), { threshold: .4 });
  if (!still) $$('.build-on-view').forEach(s => buildObs.observe(s));

  // ---------- features: highlight the area being read ----------
  const areaLinks = $$('.f-index a');
  if (areaLinks.length) {
    const idxObs = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      areaLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-30% 0px -60% 0px' });
    $$('.f-sec').forEach(s => idxObs.observe(s));
  }

  // ---------- parallax ----------
  if (still) return;
  // Hero: each plate of the B slides off at its own pace as the hero scrolls away.
  const SLIDE = [[-0.6, .25], [-1.1, .1], [1.2, .15], [-0.4, -.1], [-1.4, 0], [1.5, -.05], [-0.8, -.2]];
  const hero = document.querySelector('.hero');
  const ghostBars = $$('#ghost g');
  const drifters = $$('[data-drift]');
  if (!ghostBars.length && !drifters.length) return;
  function tick() {
    const vh = innerHeight;
    if (hero) {
      const p = Math.min(1, Math.max(0, scrollY / (hero.offsetHeight || 1)));
      ghostBars.forEach((g, i) => { const [dx, dy] = SLIDE[i]; g.setAttribute('transform', `translate(${(dx * 26 * p).toFixed(2)} ${(dy * 26 * p).toFixed(2)})`); });
    }
    // Everything else drifts against the scroll as it crosses the screen.
    drifters.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      const t = (r.top + r.height / 2 - vh / 2) / vh; // -1..1 around the middle of the screen
      el.style.transform = `translate3d(0, ${(t * +el.dataset.drift * 120).toFixed(1)}px, 0)`;
    });
  }
  let queued = false;
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; tick(); }); } }, { passive: true });
  tick();
})();
