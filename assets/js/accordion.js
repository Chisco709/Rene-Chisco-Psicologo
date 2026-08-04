// ---- Acordeón de Retos ----
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reto-card[data-toggle]').forEach(card => {
    const head = card.querySelector('.reto-head');
    head.addEventListener('click', () => {
      const wasOpen = card.classList.contains('open');
      card.classList.toggle('open', !wasOpen);
    });
  });
});
