// EJEMPLO — patrón a seguir para que index.html deje de tener texto "quemado"
// y lo tome de data/home.json, data/site.json y data/testimonios.json.
//
// Esto es una muestra de la sección Hero + Opiniones. Para que funcione de
// verdad hay que:
//   1) Quitar el texto fijo del HTML y poner ids donde antes había texto
//      (p. ej. <h1 id="hero-title">, <p id="hero-lead">).
//   2) Incluir este script (o su versión completa) en index.html.
//
// Si quieres, en el siguiente paso te devuelvo el index.html ya modificado.

async function cargarInicio() {
  const [home, site, testimonios] = await Promise.all([
    fetch("/data/home.json").then(r => r.json()),
    fetch("/data/site.json").then(r => r.json()),
    fetch("/data/testimonios.json").then(r => r.json())
  ]);

  // --- Hero ---
  document.querySelector("#hero-eyebrow").textContent = home.hero.eyebrow;
  document.querySelector("#hero-title").innerHTML =
    `${home.hero.title} <em>${home.hero.title_highlight}</em>`;
  document.querySelector("#hero-lead").textContent = home.hero.lead;

  const statsWrap = document.querySelector("#hero-stats");
  statsWrap.innerHTML = home.hero.stats
    .map(s => `<div><b>${s.value}</b><span>${s.label}</span></div>`)
    .join("");

  // --- Opiniones (toma solo las primeras 3, siempre sincronizadas) ---
  const opinionesWrap = document.querySelector("#opiniones-preview");
  opinionesWrap.innerHTML = testimonios.lista
    .slice(0, 3)
    .map(t => `<div class="testi-card"><p>"${t.texto}"</p><span>${t.autor}</span></div>`)
    .join("");

  // --- Botón de WhatsApp flotante, tomado de site.json ---
  const wa = document.querySelector(".whatsapp-float");
  const numero = site.contacto.whatsapp_numero;
  const mensaje = encodeURIComponent(site.contacto.whatsapp_mensaje);
  wa.href = `https://wa.me/${numero}?text=${mensaje}`;
}

document.addEventListener("DOMContentLoaded", cargarInicio);