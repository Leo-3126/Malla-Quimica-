const ramos = [
  // Ciclo I
  { id: 'mat1', nombre: 'Matemáticas I', requisitos: [] },
  { id: 'fis1', nombre: 'Física I', requisitos: [] },
  { id: 'quim1', nombre: 'Química General I', requisitos: [] },
  { id: 'ing1', nombre: 'Inglés Técnico I', requisitos: [] },

  // Ciclo II
  { id: 'mat2', nombre: 'Matemáticas II', requisitos: ['mat1'] },
  { id: 'fis2', nombre: 'Física II', requisitos: ['fis1'] },
  { id: 'quim2', nombre: 'Química General II', requisitos: ['quim1'] },
  { id: 'ing2', nombre: 'Inglés Técnico II', requisitos: ['ing1'] },
  { id: 'redac', nombre: 'Técnicas de Redacción', requisitos: [] },

  // Ciclo III
  { id: 'mat3', nombre: 'Matemáticas III', requisitos: ['mat2'] },
  { id: 'qacual', nombre: 'Química Analítica Cualitativa', requisitos: ['quim2'] },
  { id: 'org1', nombre: 'Química Orgánica I', requisitos: ['quim2'] },
  { id: 'inorg', nombre: 'Química Inorgánica', requisitos: ['quim2'] },

  // Ciclo IV
  { id: 'org2', nombre: 'Química Orgánica II', requisitos: ['org1'] },
  { id: 'qacuant', nombre: 'Química Analítica Cuantitativa', requisitos: ['qacual'] },
  { id: 'estad', nombre: 'Estadística', requisitos: ['mat2'] },
  { id: 'biog', nombre: 'Biología General', requisitos: ['quim2'] },
  { id: 'socio', nombre: 'Sociología', requisitos: [] },

  // Ciclo V
  { id: 'aorg', nombre: 'Análisis Orgánico Estructural', requisitos: ['org2'] },
  { id: 'fisico1', nombre: 'Fisicofarmacia I', requisitos: ['qacuant', 'fis2', 'mat3', 'estad'] },
  { id: 'bioq', nombre: 'Bioquímica General', requisitos: ['org2', 'qacuant'] },
  { id: 'zool', nombre: 'Zoología Aplicada a la Farmacia', requisitos: ['org2', 'biog'] },
  { id: 'psico', nombre: 'Psicología Aplicada a la Empresa', requisitos: [] },

  // Ciclo VI
  { id: 'anato', nombre: 'Anatomía', requisitos: ['bioq', 'biog'] },
  { id: 'fisico2', nombre: 'Fisicofarmacia II', requisitos: ['fisico1'] },
  { id: 'micro', nombre: 'Microbiología y Parasitología', requisitos: ['zool', 'bioq'] },
  { id: 'botan', nombre: 'Botánica General y Farmacéutica', requisitos: ['biog', 'bioq'] },
  { id: 'admin', nombre: 'Principios de Administración', requisitos: [] },

  // Ciclo VII
  { id: 'fisio', nombre: 'Fisiología', requisitos: ['anato'] },
  { id: 'instr', nombre: 'Análisis Instrumental', requisitos: ['qacuant', 'aorg', 'fisico2'] },
  { id: 'farmacoq', nombre: 'Farmacoquímica', requisitos: ['inorg', 'qacuant', 'aorg'] },
  { id: 'farcog', nombre: 'Farmacognosia', requisitos: ['aorg', 'bioq', 'botan'] },
  { id: 'opt1', nombre: 'Optativa I', requisitos: ['fisico2'] },

  // Ciclo VIII
  { id: 'farmaco', nombre: 'Farmacología', requisitos: ['fisio'] },
  { id: 'broma', nombre: 'Análisis Bromatológico', requisitos: ['micro', 'instr'] },
  { id: 'farmaTec', nombre: 'Farmacotecnia', requisitos: ['farmacoq', 'farcog'] },
  { id: 'opt2', nombre: 'Optativa II', requisitos: ['opt1'] },

  // Ciclo IX
  { id: 'toxico', nombre: 'Química Forense y Toxicología', requisitos: ['instr', 'farmaco'] },
  { id: 'ccpf', nombre: 'Control Calidad Prod. Farmacéuticos', requisitos: ['ing2', 'estad', 'instr', 'farmaco', 'farmaTec'] },
  { id: 'tecfarm', nombre: 'Tecnología Farmacéutica', requisitos: ['fisico2', 'farmaco', 'farmaTec'] },
  { id: 'ambiente', nombre: 'Contaminación Ambiental y Salud Pública', requisitos: ['farmaco', 'broma'] },
  { id: 'opt3', nombre: 'Optativa III', requisitos: ['opt2'] },

  // Ciclo X
  { id: 'legis', nombre: 'Legislación Farmacéutica y Deontología', requisitos: ['ccpf', 'tecfarm'] },
  { id: 'cccosme', nombre: 'Control Calidad Farmacéutica y Cosmética', requisitos: ['ccpf'] },
  { id: 'teccosme', nombre: 'Tecnología Farmacéutica y Cosmética', requisitos: ['ccpf', 'tecfarm'] },
  { id: 'quimind', nombre: 'Química Industrial y Recursos Renovables', requisitos: ['farcog', 'ambiente'] },
  { id: 'opt4', nombre: 'Optativa IV', requisitos: ['opt3'] },
];

function renderMalla() {
  const contenedor = document.getElementById('malla');
  ramos.forEach(ramo => {
    const div = document.createElement('div');
    div.className = 'ramo';
    div.id = ramo.id;
    div.textContent = ramo.nombre;
    contenedor.appendChild(div);
  });
  desbloquearIniciales();
}

function desbloquearIniciales() {
  ramos.forEach(ramo => {
    if (ramo.requisitos.length === 0) {
      document.getElementById(ramo.id).classList.add('desbloqueado');
    }
  });
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('desbloqueado') && !e.target.classList.contains('aprobado')) {
    e.target.classList.add('aprobado');
    desbloquearDependientes(e.target.id);
  }
});

function desbloquearDependientes(idAprobado) {
  ramos.forEach(ramo => {
    if (!document.getElementById(ramo.id).classList.contains('aprobado')) {
      const requisitosCumplidos = ramo.requisitos.every(req => {
        return document.getElementById(req).classList.contains('aprobado');
      });
      if (requisitosCumplidos) {
        document.getElementById(ramo.id).classList.add('desbloqueado');
      }
    }
  });
}

renderMalla();
