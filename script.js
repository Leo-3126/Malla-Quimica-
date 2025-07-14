const ramos = [
  // tu lista de ramos aquí (ya está bien como la tienes)
];

function renderMalla() {
  ramos.forEach(ramo => {
    const div = document.getElementById(ramo.id);
    if (div) {
      div.textContent = ramo.nombre;
    }
  });
  desbloquearIniciales();
  actualizarProgreso();
}

function desbloquearIniciales() {
  ramos.forEach(ramo => {
    if (ramo.requisitos.length === 0) {
      const el = document.getElementById(ramo.id);
      if (el) el.classList.add('desbloqueado');
    }
  });
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('desbloqueado') && !e.target.classList.contains('aprobado')) {
    e.target.classList.add('aprobado');
    desbloquearDependientes(e.target.id);
    actualizarProgreso();
  }
});

function desbloquearDependientes(idAprobado) {
  ramos.forEach(ramo => {
    const el = document.getElementById(ramo.id);
    if (!el.classList.contains('aprobado')) {
      const requisitosCumplidos = ramo.requisitos.every(req => {
        const reqEl = document.getElementById(req);
        return reqEl && reqEl.classList.contains('aprobado');
      });
      if (requisitosCumplidos) {
        el.classList.add('desbloqueado');
      }
    }
  });
}

function actualizarProgreso() {
  const total = ramos.length;
  const aprobados = ramos.filter(r => {
    const el = document.getElementById(r.id);
    return el && el.classList.contains('aprobado');
  }).length;

  const porcentaje = (aprobados / total) * 100;
  const barra = document.getElementById('progreso-barra-inner');
  const texto = document.getElementById('progreso-texto');

  if (barra) barra.style.width = porcentaje + '%';
  if (texto) texto.textContent = `${aprobados} ramos completados de ${total}`;
}

renderMalla();



