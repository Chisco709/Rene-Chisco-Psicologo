// ---- Cuestionario: ¿qué reto necesitas? ----
document.addEventListener('DOMContentLoaded', () => {
  const qContainer = document.getElementById('quiz-questions');
  if (!qContainer) return;

  const quizData = [
    { q: "¿Qué frase se parece más a ti?", opts: [
      ["A","Me siento apagado, triste o con ansiedad frecuente."],
      ["B","Sé que tengo potencial, pero me saboteo o me distraigo."],
      ["C","Me siento listo para dejar atrás una historia que ya no me define."],
      ["D","Me gustaría tener una mentalidad más fuerte y enfocada."],
      ["E","Necesito expresar mejor mis ideas y tener más seguridad."],
      ["F","Quiero romper mis bloqueos mentales y crear nuevas creencias."],
      ["G","Siento que la vida me ha golpeado y quiero volver a empezar con fuerza."]
    ]},
    { q: "¿Cuál es tu prioridad más urgente?", opts: [
      ["A","Sanar emocionalmente y sentirme más feliz."],
      ["B","Tener un sistema de hábitos y claridad para lograr mis metas."],
      ["C","Cerrar ciclos, reconstruirme y escribir una nueva versión de mi historia."],
      ["D","Reprogramar mi mente desde lo más profundo."],
      ["E","Hablar mejor, liderar, inspirar o vender mis ideas."],
      ["F","Conectar mi energía, propósito y acción con las leyes del universo."],
      ["G","Volverme más resiliente y decidido ante los retos de la vida."]
    ]},
    { q: "¿Con cuál te identificas más ahora mismo?", opts: [
      ["A","Me cuesta disfrutar la vida y tengo pensamientos negativos recurrentes."],
      ["B","Me falta enfoque y me pierdo entre tantas ideas o emociones."],
      ["C","Quiero cerrar capítulos de mi vida que me pesan y rediseñar mi historia personal."],
      ["E","Me da miedo hablar en público o no logro conectar con las personas."],
      ["F","Siento que estoy programado con creencias que no me dejan avanzar."],
      ["G","He vivido pérdidas, fracasos o traumas que quiero transformar en fuerza interior."]
    ]},
    { q: "¿Qué te motiva más a buscar este proceso?", opts: [
      ["A","Recuperar la alegría y la motivación."],
      ["B","Tener estructura, hábitos y orden interno."],
      ["C","Reescribir mi historia desde el crecimiento y la conciencia."],
      ["D","Reiniciar mi mente y construir nuevas creencias."],
      ["E","Sentirme más seguro y tener impacto con mi voz y mi presencia."],
      ["F","Elevar mi conciencia y sintonizar con las leyes universales."],
      ["G","Convertirme en alguien más fuerte, más resiliente y con propósito."]
    ]}
  ];

  const quizResults = {
    A: {title:"Aprendiendo a Ser Feliz", desc:"Sanarás tu mundo emocional, cultivarás alegría, autocuidado y gratitud para recuperar el sentido de vivir. Un reto de 30 días con 4 sesiones de acompañamiento y un diario de transformación."},
    B: {title:"Crea tu Sistema de Éxito Personal", desc:"Diseñarás una estructura de hábitos, propósito, visión y foco para construir una vida poderosa y sostenible, apoyado en la Rueda de la Vida."},
    C: {title:"Transforma tu Historia", desc:"Cerrarás ciclos, te reconciliarás contigo mismo y rediseñarás tu narrativa desde la conciencia y el amor propio, en un proceso individual e intensivo."},
    D: {title:"Reprográmate", desc:"Eliminarás patrones limitantes, instalarás nuevas creencias y recuperarás tu poder mental y emocional en 30 días de entrenamiento."},
    E: {title:"Desafío Oratoria", desc:"Potenciarás tu voz, confianza y presencia para comunicarte con seguridad, claridad y magnetismo frente a cualquier público."},
    F: {title:"La Física de la Búsqueda", desc:"Aprenderás a alinear mente, energía y acción con los principios de la física cuántica y la espiritualidad práctica para reconstruirte con sentido."},
    G: {title:"Resiliencia y Renacer", desc:"Fortalecerás tu carácter a través de herramientas diarias para enfrentar la adversidad, reinventarte y avanzar con propósito."}
  };

  let quizStep = 0;
  const answers = new Array(quizData.length).fill(null);

  quizData.forEach((item, qi) => {
    const div = document.createElement('div');
    div.className = 'quiz-q' + (qi === 0 ? ' active' : '');
    div.dataset.step = qi;
    const ul = item.opts.map(([letter,text]) =>
      `<li data-letter="${letter}"><span class="letter">${letter}</span><span>${text}</span></li>`
    ).join('');
    div.innerHTML = `<span class="qnum">Pregunta ${qi+1} de ${quizData.length}</span><h3>${item.q}</h3><ul class="quiz-options">${ul}</ul>`;
    qContainer.appendChild(div);
  });

  qContainer.addEventListener('click', (e) => {
    const li = e.target.closest('li[data-letter]');
    if(!li) return;
    const qDiv = li.closest('.quiz-q');
    qDiv.querySelectorAll('li').forEach(l => l.classList.remove('selected'));
    li.classList.add('selected');
    answers[+qDiv.dataset.step] = li.dataset.letter;
  });

  function renderQuizNav(){
    document.getElementById('quiz-progress').textContent = `${quizStep+1} / ${quizData.length}`;
    document.getElementById('quiz-prev').style.visibility = quizStep === 0 ? 'hidden' : 'visible';
    document.getElementById('quiz-next').textContent = quizStep === quizData.length-1 ? 'Ver mi resultado' : 'Siguiente';
  }
  renderQuizNav();

  document.getElementById('quiz-next').addEventListener('click', () => {
    if(!answers[quizStep]){
      const qDiv = qContainer.querySelector(`.quiz-q[data-step="${quizStep}"]`);
      qDiv.style.animation = 'none'; qDiv.offsetHeight; qDiv.style.animation = null;
      return;
    }
    if(quizStep < quizData.length - 1){
      qContainer.querySelector(`.quiz-q[data-step="${quizStep}"]`).classList.remove('active');
      quizStep++;
      qContainer.querySelector(`.quiz-q[data-step="${quizStep}"]`).classList.add('active');
      renderQuizNav();
    } else {
      showQuizResult();
    }
  });

  document.getElementById('quiz-prev').addEventListener('click', () => {
    if(quizStep === 0) return;
    qContainer.querySelector(`.quiz-q[data-step="${quizStep}"]`).classList.remove('active');
    quizStep--;
    qContainer.querySelector(`.quiz-q[data-step="${quizStep}"]`).classList.add('active');
    renderQuizNav();
  });

  function showQuizResult(){
    const counts = {};
    answers.forEach(a => { if(a) counts[a] = (counts[a]||0)+1; });
    let best = 'A', max = 0;
    Object.entries(counts).forEach(([letter,c]) => { if(c > max){ max = c; best = letter; } });
    const r = quizResults[best];
    document.getElementById('result-title').textContent = r.title;
    document.getElementById('result-desc').textContent = r.desc;
    document.getElementById('quiz-box').hidden = true;
    document.getElementById('quiz-result').hidden = false;
  }

  document.getElementById('quiz-restart').addEventListener('click', () => {
    answers.fill(null);
    quizStep = 0;
    qContainer.querySelectorAll('.quiz-q').forEach((d,i) => d.classList.toggle('active', i===0));
    qContainer.querySelectorAll('li.selected').forEach(l => l.classList.remove('selected'));
    renderQuizNav();
    document.getElementById('quiz-result').hidden = true;
    document.getElementById('quiz-box').hidden = false;
  });
});
