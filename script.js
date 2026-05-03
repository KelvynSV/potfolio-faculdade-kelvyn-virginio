// Código para alterar o tema da página.
const html = document.documentElement;
const themeBtn  = document.getElementById('theme-toggle');
const iconMoon  = document.getElementById('icon-moon');
const iconSun   = document.getElementById('icon-sun');
const themeLabel = document.getElementById('theme-label');

themeBtn.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  iconMoon.classList.toggle('hidden', isDark);
  iconSun.classList.toggle('hidden', !isDark);
  themeLabel.textContent = isDark ? 'dark' : 'light';
});

// Código para montar o hamburgue do menu mobile.
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  })
);

// Código para exibir o modal.
const modal    = document.getElementById('modal');
const modalMsg = document.getElementById('modal-msg');
const modalClose = document.getElementById('modal-close');

function showModal(msg) {
  modalMsg.textContent = msg;
  modal.classList.remove('hidden');
}

modalClose.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });

// Código para validação do formulário de contato.
const form = document.getElementById('contact-form');

function setError(fieldId, msg) {
  document.getElementById(fieldId + '-error').textContent = msg;
}

function clearErrors() {
  ['name', 'email', 'message'].forEach(f => setError(f, ''));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let valid = true;

  if (!name)              { setError('name', '// campo obrigatório');          valid = false; }
  if (!email)             { setError('email', '// campo obrigatório');         valid = false; }
  else if (!isValidEmail(email)) { setError('email', '// e-mail inválido');   valid = false; }
  if (!message)           { setError('message', '// campo obrigatório');       valid = false; }

  if (!valid) return;

  form.reset();
  showModal('✓ Mensagem enviada com sucesso!');
});
