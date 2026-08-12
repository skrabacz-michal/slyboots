// Loop dip + the door.
const ACCESS_KEY = 'fee4e9be-a186-4eaa-ac2e-cf23c88e2335';
// demo mode exists only for local development; production always submits
const DEMO = ['localhost', '127.0.0.1'].includes(location.hostname);

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

// ── the door ──
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const stage = document.querySelector('.stage');
const enter = document.getElementById('enter');
const doorHit = document.getElementById('door-hit');
const join = document.getElementById('join');
const back = document.getElementById('join-back');
let enterTimer = null;

function enterDoor() {
  if (document.body.classList.contains('entering')) return;
  document.body.classList.add('entering'); // zoom into the portal, flash to white
  enterTimer = setTimeout(() => {
    document.body.classList.add('inside'); // reveal the form, let the flash lift
    join.setAttribute('aria-hidden', 'false');
    stage.inert = true; // the black world leaves tab order and the a11y tree
    v.pause();
    document.getElementById('j-name').focus();
  }, reduced ? 50 : 1900);
}
enter.addEventListener('click', enterDoor);
doorHit.addEventListener('click', enterDoor); // the door itself opens

let returnTimer = null;

function leave() {
  clearTimeout(returnTimer); // manual exit cancels the auto-return
  document.body.classList.remove('inside', 'entering'); // zoom back out
  join.setAttribute('aria-hidden', 'true');
  stage.inert = false;
  const pp = v.play();
  if (pp && pp.catch) pp.catch(() => {});
  enter.focus();
}
back.addEventListener('click', leave);
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (document.body.classList.contains('inside')) {
    leave();
  } else if (document.body.classList.contains('entering')) {
    clearTimeout(enterTimer); // cancel mid-transit; the zoom eases back out
    document.body.classList.remove('entering');
  }
});

// ── the ledger ──
const form = document.getElementById('join-form');
const done = document.getElementById('join-done');
const formError = form.querySelector('.form-error');
const submit = form.querySelector('.join-submit');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formError.hidden = true;
  let ok = true;
  for (const field of form.querySelectorAll('.field')) {
    const input = field.querySelector('input');
    const bad = !input.checkValidity();
    field.querySelector('.field-error').hidden = !bad;
    if (bad) ok = false;
  }
  if (!ok) return;

  submit.disabled = true;
  submit.textContent = 'The Ledger opens…';
  try {
    if (DEMO) {
      console.warn('Local demo: the vow was not sent anywhere.');
      await new Promise((r) => setTimeout(r, 900));
    } else {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'An apostate has walked through the door',
          from_name: 'slyboots.church',
          name: form.name.value,
          email: form.email.value,
        }),
      });
      if (!res.ok) throw new Error('ledger closed');
    }
    form.classList.add('form-fade'); // the form dissolves first
    setTimeout(() => {
      form.hidden = true;
      done.hidden = false;
      document.body.classList.add('ordained'); // the veil passes, the sentence lands
      returnTimer = setTimeout(leave, 5000); // the door returns you to the night
    }, reduced ? 0 : 250);
  } catch {
    formError.hidden = false;
    submit.disabled = false;
    submit.textContent = 'Join the Church';
  }
});
