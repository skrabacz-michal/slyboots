// Loop dip + the door. Paste your Web3Forms access key below (free at
// https://web3forms.com); until then the join form runs in demo mode.
const ACCESS_KEY = 'YOUR_ACCESS_KEY';

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
const enter = document.getElementById('enter');
const join = document.getElementById('join');
const back = document.getElementById('join-back');

enter.addEventListener('click', () => {
  document.body.classList.add('entering'); // zoom into the portal, flash to white
  setTimeout(() => {
    document.body.classList.add('inside'); // reveal the form, let the flash lift
    join.setAttribute('aria-hidden', 'false');
    v.pause();
    document.getElementById('j-name').focus();
  }, reduced ? 50 : 1900);
});

function leave() {
  document.body.classList.remove('inside', 'entering'); // zoom back out
  join.setAttribute('aria-hidden', 'true');
  const pp = v.play();
  if (pp && pp.catch) pp.catch(() => {});
  enter.focus();
}
back.addEventListener('click', leave);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('inside')) leave();
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
    if (ACCESS_KEY === 'YOUR_ACCESS_KEY') {
      // ponytail: no key configured yet; demo the ordination locally
      console.warn('Web3Forms key not set. The vow was not sent anywhere.');
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
    form.hidden = true;
    done.hidden = false;
  } catch {
    formError.hidden = false;
    submit.disabled = false;
    submit.textContent = 'Join the Church';
  }
});
