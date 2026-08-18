// ---- Carrusel de opiniones (carga desde data/testimonios.json) ----
document.addEventListener('DOMContentLoaded', async () => {
  const track = document.getElementById('testi-track');
  if (!track) return;

  function card(t){
    const div = document.createElement('div');
    div.className = 'testi-card';
    div.innerHTML = `<p>"${t.texto}"</p><span>${t.autor}</span>`;
    return div;
  }

  try {
    const res = await fetch('data/testimonios.json');
    const data = await res.json();
    const testimonios = data.lista || [];
    [...testimonios, ...testimonios].forEach(t => track.appendChild(card(t)));
  } catch (e) {
    console.error('No se pudo cargar testimonios.json', e);
  }
});
  