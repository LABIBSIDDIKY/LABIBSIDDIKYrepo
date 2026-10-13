/* ==========================================================
   circuit-hover.js
   Cyan electric-circuit effect on hover / keyboard focus for
   every clickable element. One shared overlay <svg>, so no
   markup changes are needed in any template.

   Opt a specific element in:   data-circuit
   Opt a specific element out:  data-circuit="off"
   ========================================================== */

const SELECTOR = [
  'a[href]',
  'button',
  '[role="button"]',
  'summary',
  'input[type="submit"]',
  'input[type="button"]',
  '.contact-form input',
  '.contact-form textarea',
  '.mind-node',           // main skill nodes (partials/skill-node)
  '.sub-node',            // sub-skill pills created by mindmap.js
  '[data-circuit]'
].join(',');

const EXCLUDE = '[disabled], [aria-disabled="true"], .skip-link, [data-circuit="off"]';

const NS = 'http://www.w3.org/2000/svg';
const PAD = 14; // room around the element for branch traces (px)

// Load the stylesheet automatically (expects /js/ and /css/ side by side)
if (!document.querySelector('link[data-circuit-hover]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL('../css/circuit-hover.css', import.meta.url).href;
  link.dataset.circuitHover = '';
  document.head.appendChild(link);
}

let svg = null;
let hoveredEl = null;
let focusedEl = null;
let activeEl = null;
let raf = 0;

function ensureOverlay() {
  if (svg) return;
  svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'cx-overlay');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  document.body.appendChild(svg);
}

/* Small seeded random so each element keeps the same layout every hover */
function seeded(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function el(name, attrs) {
  const node = document.createElementNS(NS, name);
  for (const k in attrs) node.setAttribute(k, attrs[k]);
  return node;
}

function cornerRadius(target, w, h) {
  const raw = getComputedStyle(target).borderTopLeftRadius || '0';
  const v = parseFloat(raw) || 0;
  const r = raw.includes('%') ? (v / 100) * Math.min(w, h) : v;
  return Math.min(r, w / 2, h / 2);
}

function build(target) {
  const r = target.getBoundingClientRect();
  const w = r.width;
  const h = r.height;
  const W = w + PAD * 2;
  const H = h + PAD * 2;
  const rad = cornerRadius(target, w, h);

  svg.style.width = W + 'px';
  svg.style.height = H + 'px';
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.replaceChildren();

  // 1. Outline + traveling current
  const rectAttrs = { x: PAD, y: PAD, width: w, height: h, rx: rad, pathLength: 100 };
  svg.appendChild(el('rect', { ...rectAttrs, class: 'cx-base' }));
  svg.appendChild(el('rect', { ...rectAttrs, class: 'cx-pulse' }));

  // 2. Branch traces with right-angle jogs and a node on the end
  const rnd = seeded(target.className + '|' + (target.textContent || '').trim().slice(0, 24) + '|' + Math.round(w) + 'x' + Math.round(h));
  const count = Math.max(2, Math.min(6, Math.round((w + h) / 90)));
  const sides = [
    { ox: 0, oy: -1 }, // top
    { ox: 1, oy: 0 },  // right
    { ox: 0, oy: 1 },  // bottom
    { ox: -1, oy: 0 }  // left
  ];
  const m = Math.max(rad, 6) + 2;

  for (let i = 0; i < count; i++) {
    const s = sides[(i + Math.floor(rnd() * 4)) % 4];
    const horizontalEdge = s.oy !== 0;
    const span = (horizontalEdge ? w : h) - m * 2;
    const t = span > 4 ? m + rnd() * span : (horizontalEdge ? w : h) / 2;

    let x = PAD + (horizontalEdge ? t : s.ox > 0 ? w : 0);
    let y = PAD + (horizontalEdge ? (s.oy > 0 ? h : 0) : t);

    const px = -s.oy;
    const py = s.ox;
    const sg = rnd() > 0.5 ? 1 : -1;

    const p1 = [x + s.ox * 5, y + s.oy * 5];
    const p2 = [p1[0] + px * sg * 7, p1[1] + py * sg * 7];
    const p3 = [p2[0] + s.ox * 7, p2[1] + s.oy * 7];
    const delay = (0.15 + i * 0.07).toFixed(2);

    svg.appendChild(el('path', {
      class: 'cx-branch',
      pathLength: 100,
      d: `M${x} ${y} L${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]} L${p3[0]} ${p3[1]}`,
      style: `animation-delay:${delay}s`
    }));
    svg.appendChild(el('circle', {
      class: 'cx-node',
      cx: p3[0],
      cy: p3[1],
      r: 1.9,
      style: `animation-delay:${(+delay + 0.3).toFixed(2)}s`
    }));
  }
}

/* Keep the overlay centered on the element (handles scroll and hover transforms) */
function place(target) {
  const r = target.getBoundingClientRect();
  const W = r.width + PAD * 2;
  const H = r.height + PAD * 2;
  svg.style.left = r.left + r.width / 2 - W / 2 + 'px';
  svg.style.top = r.top + r.height / 2 - H / 2 + 'px';
  return r;
}

function loop() {
  if (!activeEl) return;
  if (!activeEl.isConnected) return refresh();
  const r = place(activeEl);
  if (r.width === 0 || r.height === 0) return refresh();
  raf = requestAnimationFrame(loop);
}

function activate(target) {
  ensureOverlay();
  activeEl = target;
  svg.classList.remove('is-on');
  build(target);
  place(target);
  // force restart of CSS animations, then fade in
  void svg.getBoundingClientRect();
  svg.classList.add('is-on');
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(loop);
}

function deactivate() {
  activeEl = null;
  cancelAnimationFrame(raf);
  if (svg) svg.classList.remove('is-on');
}

function refresh() {
  const next = hoveredEl || focusedEl;
  if (next === activeEl) return;
  next ? activate(next) : deactivate();
}

function findTarget(node) {
  if (!(node instanceof Element)) return null;
  const t = node.closest(SELECTOR);
  return t && !t.matches(EXCLUDE) ? t : null;
}

document.addEventListener('pointerover', (e) => {
  if (e.pointerType === 'touch') return;
  hoveredEl = findTarget(e.target);
  refresh();
});

document.addEventListener('pointerout', (e) => {
  if (e.pointerType === 'touch') return;
  const leaving = findTarget(e.target);
  if (leaving && leaving === hoveredEl && !leaving.contains(e.relatedTarget)) {
    hoveredEl = null;
    refresh();
  }
});

document.addEventListener('focusin', (e) => {
  const t = findTarget(e.target);
  focusedEl = t && t.matches(':focus-visible') ? t : null;
  refresh();
});

document.addEventListener('focusout', () => {
  focusedEl = null;
  refresh();
});

window.addEventListener('blur', () => {
  hoveredEl = null;
  focusedEl = null;
  refresh();
});