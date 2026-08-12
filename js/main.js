// Seamless-ish loop: the clip's last frame does not match its first, so a
// native loop restart shows as a hard cut. Instead, two copies of the video
// crossfade: the standby starts from 0 and dissolves in over the last
// ~1.1s of the active copy. The portal (the big static bright element)
// stays lit through the dissolve, so the cut disappears.

const FADE_TRIGGER = 1.25; // s before the end; CSS transition is 1.1s

const [a, b] = document.querySelectorAll('.plate-video');

for (const v of [a, b]) {
  v.muted = true;
  v.defaultMuted = true;
  v.playsInline = true;
}
a.autoplay = true;
const p = a.play();
if (p && p.catch) p.catch(() => {});

let active = a;
let standby = b;
let fading = false;

standby.style.zIndex = '1'; // incoming copy dissolves in on top

function onTime() {
  if (fading || this !== active || !this.duration) return;
  if (this.currentTime < this.duration - FADE_TRIGGER) return;
  fading = true;
  standby.currentTime = 0;
  const pp = standby.play();
  if (pp && pp.catch) pp.catch(() => {});
  standby.classList.remove('v-hidden');
  setTimeout(() => {
    active.pause();
    active.classList.add('v-hidden');
    active.style.zIndex = '1';
    standby.style.zIndex = '0';
    [active, standby] = [standby, active];
    fading = false;
  }, 1200);
}

a.addEventListener('timeupdate', onTime);
b.addEventListener('timeupdate', onTime);
