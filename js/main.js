// The clip does not loop seamlessly, so instead of a hard cut the video
// dips to the page's black over its last ~0.6s, restarts from zero while
// dark, and fades back up. The loop point reads as a breath, not a jump.

const DIP_TRIGGER = 0.85; // s before the end; CSS fade is 0.6s

const v = document.querySelector('.plate-video');
v.muted = true;
v.defaultMuted = true;
v.playsInline = true;
v.autoplay = true;
const p = v.play();
if (p && p.catch) p.catch(() => {});

let dipping = false;

v.addEventListener('timeupdate', () => {
  if (dipping || !v.duration || v.currentTime < v.duration - DIP_TRIGGER) return;
  dipping = true;
  v.classList.add('v-dark');
  setTimeout(() => {
    v.currentTime = 0;
    const pp = v.play(); // 'ended' pauses it if the fade outlasted the clip
    if (pp && pp.catch) pp.catch(() => {});
    v.classList.remove('v-dark');
    setTimeout(() => { dipping = false; }, 700);
  }, 650);
});
