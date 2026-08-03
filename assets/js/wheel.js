// ---- Rueda de la Vida ----
document.addEventListener('DOMContentLoaded', () => {
  const svg = document.getElementById('wheel-svg');
  if (!svg) return;

  const dims = [
    {label:"Felicidad", hex:"#3f5a4d"},
    {label:"Sistema de Éxito", hex:"#b8863e"},
    {label:"Crecimiento", hex:"#a6503b"},
    {label:"Mentalidad", hex:"#2a4038"},
    {label:"Comunicación", hex:"#c79a52"},
    {label:"Propósito", hex:"#6f8a72"},
    {label:"Resiliencia", hex:"#8a4a3a"}
  ];

  const cx = 150, cy = 150, rOuter = 148, rInner = 62;
  const n = dims.length;
  const step = (Math.PI*2)/n;

  function polar(r, angle){
    return [cx + r*Math.cos(angle), cy + r*Math.sin(angle)];
  }

  dims.forEach((d, i) => {
    const start = -Math.PI/2 + i*step;
    const end = start + step - 0.035;
    const [x1,y1] = polar(rOuter, start);
    const [x2,y2] = polar(rOuter, end);
    const [x3,y3] = polar(rInner, end);
    const [x4,y4] = polar(rInner, start);
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    const dPath = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 0 0 ${x4} ${y4} Z`;
    path.setAttribute('d', dPath);
    path.setAttribute('fill', d.hex);
    path.setAttribute('class','wheel-seg');
    path.style.opacity = '0';
    path.style.animation = `fadein .5s ease ${i*0.07}s forwards`;
    path.dataset.index = i;
    svg.appendChild(path);
    path.addEventListener('mouseenter', () => setActive(i));
    path.addEventListener('click', () => setActive(i));
  });

  const styleTag = document.createElement('style');
  styleTag.textContent = `@keyframes fadein{from{opacity:0;transform:scale(.85);}to{opacity:1;transform:scale(1);}}`;
  document.head.appendChild(styleTag);

  const labelsUl = document.getElementById('wheel-labels');
  dims.forEach((d,i) => {
    const li = document.createElement('li');
    li.textContent = d.label;
    li.dataset.index = i;
    li.addEventListener('mouseenter', () => setActive(i));
    li.addEventListener('click', () => setActive(i));
    labelsUl.appendChild(li);
  });

  function setActive(i){
    document.querySelectorAll('.wheel-seg').forEach(s => s.classList.toggle('active', +s.dataset.index === i));
    document.querySelectorAll('.wheel-labels li').forEach(s => s.classList.toggle('active', +s.dataset.index === i));
    document.getElementById('wheel-center-title').innerHTML = dims[i].label;
    document.getElementById('wheel-center-sub').textContent = 'RETO ' + (i+1) + ' DE 7';
  }

  document.getElementById('wheel-wrap').addEventListener('mouseleave', () => {
    document.querySelectorAll('.wheel-seg,.wheel-labels li').forEach(s => s.classList.remove('active'));
    document.getElementById('wheel-center-title').innerHTML = 'La Rueda<br>de la Vida';
    document.getElementById('wheel-center-sub').textContent = 'TOCA UN SECTOR';
  });
});
