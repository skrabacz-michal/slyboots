// Video autoplay forcing — the only logic left on the textless page.
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
