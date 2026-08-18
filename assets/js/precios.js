// ---- Cargar precios desde data/precios.json ----
document.addEventListener('DOMContentLoaded', async () => {
  const personalEl = document.getElementById('precios-personal');
  const empresarialEl = document.getElementById('precios-empresarial');
  const notaEl = document.getElementById('precios-nota');
  if (!personalEl && !empresarialEl) return;

  try {
    const res = await fetch('data/precios.json');
    const data = await res.json();

    function row(item){
      return `<div class="price-row"><div><div class="name">${item.nombre}</div>${item.descripcion ? `<span class="desc">${item.descripcion}</span>` : ''}</div><div class="price">${item.precio}</div></div>`;
    }

    if (personalEl) personalEl.innerHTML = data.personal.map(row).join('');
    if (empresarialEl) empresarialEl.innerHTML = data.empresarial.map(row).join('');
    if (notaEl) notaEl.textContent = data.nota || '';
  } catch (e) {
    console.error('No se pudo cargar precios.json', e);
  }
});
