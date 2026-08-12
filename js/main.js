// The Church of Slyboots. The scripts are few; the god prefers it that way.

// Paste your Web3Forms access key here (free at https://web3forms.com, arrives by email).
const ACCESS_KEY = 'YOUR_ACCESS_KEY';

document.documentElement.classList.add('js');

// scroll reveals
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('lit');
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// the vow
const form = document.getElementById('vow-form');
const ordination = document.getElementById('ordination');
const formError = form.querySelector('.form-error');
const button = form.querySelector('.btn-vow');

function validate() {
  let ok = true;
  for (const field of form.querySelectorAll('.field')) {
    const input = field.querySelector('input');
    const error = field.querySelector('.field-error');
    const bad = input.type === 'checkbox' ? !input.checked : !input.checkValidity();
    error.hidden = !bad;
    if (bad) ok = false;
  }
  return ok;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  formError.hidden = true;
  if (!validate()) return;

  button.disabled = true;
  button.textContent = 'The Ledger opens…';

  try {
    if (ACCESS_KEY === 'YOUR_ACCESS_KEY') {
      // ponytail: no key configured yet; demo the ordination locally instead of failing
      console.warn('Web3Forms key not set. The vow was not sent anywhere.');
      await new Promise((r) => setTimeout(r, 900));
    } else {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'A new apostle has taken the vow',
          from_name: 'The Church of Slyboots',
          name: form.name.value,
          email: form.email.value,
        }),
      });
      if (!res.ok) throw new Error('ledger closed');
    }
    form.hidden = true;
    ordination.hidden = false;
    ordination.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch {
    formError.hidden = false;
    button.disabled = false;
    button.textContent = 'Take the Vow';
  }
});
