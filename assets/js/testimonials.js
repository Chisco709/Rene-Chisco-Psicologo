// ---- Carrusel de opiniones ----
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('testi-track');
  if (!track) return;

  const testimonios = [
    {text:"Profesional excepcional. Su forma de trabajar es meticulosa y objetiva; identifica los puntos que hay que trabajar para lograr una transformación saludable.", who:"Paciente"},
    {text:"La manera de abordar los temas y de expresarse brinda confianza y tranquilidad para recibir la información.", who:"Paciente"},
    {text:"Excelente todo. Agradezco a el doctor René por su dedicación y tratamiento. Espero tener más encuentros para mi formación personal.", who:"Paciente"},
    {text:"Gran profesional que ayuda a tener una revisión profunda y sincera de uno mismo.", who:"Paciente"},
    {text:"Excelente profesional, hermosa calidad humana. Amo el proceso que estoy llevando y la persona en que me estoy convirtiendo gracias a su acompañamiento.", who:"Paciente"},
    {text:"Habla claro, concreto y persuasivo; apasionado, ama su profesión y orienta con generosidad.", who:"Paciente"},
    {text:"Maravilloso profesional, con gran capacidad de escucha, empatía y objetividad.", who:"Paciente"},
    {text:"Cambió la forma en la que yo entendía la vida; le dio un giro a mi relación de pareja y a mi enfoque personal.", who:"Paciente"},
    {text:"Amplia experiencia en coaching, puntualidad, pulcritud, profesionalismo y accesibilidad para las citas. Muy satisfecho.", who:"Paciente"},
    {text:"Ya son más de 20 años acudiendo a su consulta. Es mi sostén y mi refugio.", who:"Paciente"},
    {text:"El detalle, el propósito y su firmeza lo hacen único en su excelente labor.", who:"Paciente"},
    {text:"El acompañamiento y orientación del doctor René han sido fundamentales para encontrar mi propio camino.", who:"Paciente"},
    {text:"Su compromiso y dedicación se notan en cada detalle; un aliado fundamental en mi proceso de crecimiento.", who:"Paciente"},
    {text:"Excelente coach: encontré apoyo, dedicación y herramientas que me llevan diariamente a mi bienestar emocional.", who:"Paciente"},
    {text:"Desde hace más de 25 años he participado de procesos con él; mejoré mis habilidades comunicativas y orienté mi vida hacia mis metas.", who:"Paciente"},
    {text:"He fortalecido el manejo de mis emociones y el amor por mí, además del crecimiento personal y profesional.", who:"Paciente"},
    {text:"Su profesionalismo y capacidad de escucha hacen que cada sesión sea de gran valor; transmite motivación y confianza.", who:"Paciente"},
    {text:"Seguridad y confianza para escuchar e interpretar lo expresado. Ambiente especial para la consulta.", who:"Paciente"}
  ];

  function card(t){
    const div = document.createElement('div');
    div.className = 'testi-card';
    div.innerHTML = `<p>"${t.text}"</p><span>${t.who}</span>`;
    return div;
  }
  [...testimonios, ...testimonios].forEach(t => track.appendChild(card(t)));
});
