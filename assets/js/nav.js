// ---- Menú móvil ----
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.navtoggle');
  const nav = document.querySelector('nav.mainnav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
});
