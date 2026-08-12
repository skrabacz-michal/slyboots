// Menu toggle + video autoplay forcing. The only logic on the page (ds/README.md).

const stage = document.getElementById('stage');
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

// autoplay gotcha: force the properties imperatively (spec)
const v = document.querySelector('.plate-video');
if (v) {
  v.muted = true;
  v.defaultMuted = true;
  v.loop = true;
  v.playsInline = true;
  v.autoplay = true;
  const p = v.play();
  if (p && p.catch) p.catch(() => {});
}

function set(open) {
  stage.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.setAttribute('aria-hidden', String(!open));
}

burger.addEventListener('click', () => set(!stage.classList.contains('is-open')));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
window.addEventListener('resize', () => {
  if (window.innerWidth / window.innerHeight > 1.1) set(false);
});
