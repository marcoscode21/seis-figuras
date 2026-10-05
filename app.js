/* Seis Figuras (aplicación de productividad) — perfil de Casa Alba Catering (San Juan, Puerto Rico): datos de ejemplo y lógica */

const HOY = '2026-09-28';
const GASTOS_FIJOS_MES = 1800;
const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const MESES_CORTO = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

/* ---------- datos ---------- */

// Eventos ya realizados, con su detalle de ingresos y costos
const trabajos = [
  { fecha:'2026-06-13', nombre:'Boda Herrera–Lugo',           invitados:110, ingresos:6600,  comida:2310, personal:1500, logistica:720,  otros:260 },
  { fecha:'2026-06-27', nombre:'Graduación Colegio San Ignacio', invitados:140, ingresos:5600,  comida:2100, personal:1300, logistica:600,  otros:180 },
  { fecha:'2026-07-11', nombre:'Cena Fundación Alba',         invitados:180, ingresos:9900,  comida:3420, personal:2100, logistica:900,  otros:400 },
  { fecha:'2026-07-18', nombre:'Bautizo Familia Núñez',       invitados:50,  ingresos:2250,  comida:800,  personal:520,  logistica:240,  otros:90  },
  { fecha:'2026-07-25', nombre:'Almuerzo Nexa Logística',     invitados:45,  ingresos:1800,  comida:640,  personal:360,  logistica:150,  otros:60  },
  { fecha:'2026-08-08', nombre:'Boda Salas–Vidal',            invitados:130, ingresos:8450,  comida:2990, personal:1700, logistica:800,  otros:340 },
  { fecha:'2026-08-15', nombre:'Cumpleaños de Andrés Roca',   invitados:40,  ingresos:1900,  comida:700,  personal:380,  logistica:130,  otros:70  },
  { fecha:'2026-08-29', nombre:'Cóctel Inmobiliaria Torre Sur', invitados:90,  ingresos:4050,  comida:1560, personal:800,  logistica:420,  otros:150 },
  { fecha:'2026-09-05', nombre:'Aniversario Club Rotario',    invitados:100, ingresos:4800,  comida:1700, personal:950,  logistica:400,  otros:160 },
  { fecha:'2026-09-12', nombre:'Boda Ferrer–Díaz',            invitados:150, ingresos:10500, comida:3900, personal:2200, logistica:1000, otros:420 },
  { fecha:'2026-09-19', nombre:'Comida corporativa Nexa',     invitados:60,  ingresos:2700,  comida:950,  personal:500,  logistica:200,  otros:90  },
  { fecha:'2026-09-26', nombre:'Graduación Universidad Norte', invitados:120, ingresos:6000,  comida:2400, personal:1400, logistica:640,  otros:240 },
];

// Agenda: eventos confirmados y citas (tipo: Boda, Corporativo, Social, Cita)
const agenda = [
  { fecha:'2026-09-30', hora:'4:00 p. m.',  titulo:'Reunión con Constructora Meridiana', tipo:'Cita', lugar:'Oficina de Casa Alba, Santurce', invitados:3 },
  { fecha:'2026-10-03', hora:'2:00 p. m.',  titulo:'Boda Ramírez–Ortiz',               tipo:'Boda', lugar:'Hacienda Los Almendros, Dorado', invitados:120, total:7800 },
  { fecha:'2026-10-08', hora:'12:00 m.',    titulo:'Almuerzo Nexa Logística',           tipo:'Corporativo', lugar:'Sede Nexa, Guaynabo', invitados:45, total:1950 },
  { fecha:'2026-10-10', hora:'7:00 p. m.',  titulo:'Cumpleaños 50 de Marta Salgado',    tipo:'Social', lugar:'Residencia Salgado, Bayamón', invitados:60, total:3000 },
  { fecha:'2026-10-15', hora:'10:00 a. m.', titulo:'Degustación familia Peña',          tipo:'Cita', lugar:'Cocina de Casa Alba, Santurce', invitados:4 },
  { fecha:'2026-10-17', hora:'6:00 p. m.',  titulo:'Quinceañera de Valeria Cruz',       tipo:'Social', lugar:'Salón Terraza Real, Caguas', invitados:150, total:6750 },
  { fecha:'2026-10-22', hora:'7:30 p. m.',  titulo:'Cena de gala Fundación Alba',       tipo:'Corporativo', lugar:'Hotel Miramar, Condado', invitados:200, total:11000 },
  { fecha:'2026-10-24', hora:'3:00 p. m.',  titulo:'Baby shower de Lucía Ferrer',       tipo:'Social', lugar:'Finca La Esperanza, Humacao', invitados:35, total:1400 },
  { fecha:'2026-10-29', hora:'6:30 p. m.',  titulo:'Cóctel corporativo Torre Sur',      tipo:'Corporativo', lugar:'Terraza Torre Sur, Hato Rey', invitados:80, total:4000 },
  { fecha:'2026-11-26', hora:'1:00 p. m.',  titulo:'Cena de Acción de Gracias, familia Rivera', tipo:'Social', lugar:'Residencia Rivera, Guaynabo', invitados:25, total:1500 },
  { fecha:'2026-12-12', hora:'7:00 p. m.',  titulo:'Parranda navideña Cooperativa La Montaña', tipo:'Corporativo', lugar:'Club Cooperativa, Caguas', invitados:150, total:6300 },
];

// IVU de Puerto Rico: 10.5 % estatal + 1 % municipal
const IVU = 0.115;

const facturas = [
  { id:'F-1050', cliente:'Andrés Roca',              concepto:'Cumpleaños, saldo final',         emitida:'2026-08-15', vence:'2026-08-30', subtotal:1900,  estado:'Pagada' },
  { id:'F-1052', cliente:'Ferrer–Díaz',              concepto:'Boda, servicio completo',         emitida:'2026-09-12', vence:'2026-09-26', subtotal:10500, estado:'Pagada' },
  { id:'F-1053', cliente:'Club Rotario de Bayamón',  concepto:'Aniversario, servicio completo',  emitida:'2026-09-05', vence:'2026-09-20', subtotal:4800,  estado:'Pagada' },
  { id:'F-1056', cliente:'Ramírez–Ortiz',            concepto:'Boda, anticipo del 50 %',         emitida:'2026-09-15', vence:'2026-09-30', subtotal:3900,  estado:'Pagada' },
  { id:'F-1058', cliente:'Inmobiliaria Torre Sur',   concepto:'Cóctel, servicio completo',       emitida:'2026-08-29', vence:'2026-09-13', subtotal:4050,  estado:'Vencida' },
  { id:'F-1054', cliente:'Nexa Logística',           concepto:'Comida corporativa',              emitida:'2026-09-19', vence:'2026-10-19', subtotal:2700,  estado:'Pendiente' },
  { id:'F-1055', cliente:'Universidad Norte',        concepto:'Graduación, servicio completo',   emitida:'2026-09-26', vence:'2026-10-10', subtotal:6000,  estado:'Pendiente' },
  { id:'F-1057', cliente:'Familia Cruz',             concepto:'Quinceañera, anticipo del 50 %',  emitida:'2026-09-22', vence:'2026-10-06', subtotal:3375,  estado:'Pendiente' },
  { id:'F-1059', cliente:'Fundación Alba',           concepto:'Cena de gala, anticipo del 50 %', emitida:'2026-09-25', vence:'2026-10-09', subtotal:5500,  estado:'Pendiente' },
];
const ivuDe = f => f.subtotal * IVU;
const totalDe = f => f.subtotal + ivuDe(f);

const paquetes = [
  { nombre:'Criollo',  precio:38, detalle:'Buffet de comida típica para reuniones familiares y cumpleaños.',
    incluye:['Pastelillos surtidos','Pernil asado','Arroz con gandules y amarillos','Flan de queso','Jugo de parcha o limonada'] },
  { nombre:'Elegante', precio:52, detalle:'Servicio a la mesa para bodas y celebraciones.',
    incluye:['Alcapurrias y bacalaítos','Pollo al horno con adobo criollo o pernil','Arroz con gandules','Ensalada de aguacate y tomate','Tembleque de coco','Bebidas y café'] },
  { nombre:'Gala',     precio:68, detalle:'Cena de tres tiempos con montaje completo.',
    incluye:['Tostones rellenos de camarones al ajillo','Churrasco con chimichurri criollo','Amarillos y ensalada','Tembleque de coco','Barra de bebidas y café'] },
];

// precio y costo por persona
const carta = [
  { categoria:'Entradas', platos:[
    { nombre:'Pastelillos surtidos',            desc:'Carne, queso y pizza, fritos al momento.',            precio:4.5, costo:1.4 },
    { nombre:'Alcapurrias de carne',            desc:'Masa de yautía y plátano verde rellena de picadillo.', precio:5,   costo:1.6 },
    { nombre:'Tostones rellenos de camarones al ajillo', desc:'Canastita de plátano verde con camarones y mojo.', precio:7.5, costo:3.1 } ]},
  { categoria:'Platos fuertes', platos:[
    { nombre:'Pernil asado con ajo y orégano',  desc:'Cocido lento al horno, con su cuerito crujiente.',    precio:16,  costo:5.6 },
    { nombre:'Pollo al horno con adobo criollo', desc:'Muslo deshuesado, sofrito y aceitunas.',             precio:15,  costo:5.4 },
    { nombre:'Churrasco con chimichurri criollo', desc:'Corte a la parrilla con salsa de cilantro y ajo.',   precio:24,  costo:10.4 },
    { nombre:'Filete de chillo en salsa criolla', desc:'Pescado fresco con sofrito, pimientos y alcaparras.', precio:22,  costo:9.4 },
    { nombre:'Mofongo relleno de vegetales',    desc:'Plátano verde majado con ajo, vegetales salteados.',  precio:14,  costo:4.4 } ]},
  { categoria:'Acompañamientos', platos:[
    { nombre:'Arroz con gandules',              desc:'Con sofrito, jamón y aceitunas.',                     precio:3.5, costo:0.9 },
    { nombre:'Amarillos',                       desc:'Plátano maduro frito.',                               precio:3.5, costo:0.8 },
    { nombre:'Ensalada de aguacate y tomate',   desc:'Aguacate, tomate, cebolla y aceite de oliva.',        precio:4,   costo:1.1 } ]},
  { categoria:'Postres', platos:[
    { nombre:'Flan de queso',                   desc:'Con caramelo, individual.',                           precio:5.5, costo:1.6 },
    { nombre:'Tembleque de coco',               desc:'Crema de coco con canela.',                           precio:5,   costo:1.5 },
    { nombre:'Arroz con dulce',                 desc:'Con jengibre, canela y pasas.',                       precio:4,   costo:1.1 } ]},
  { categoria:'Bebidas', platos:[
    { nombre:'Jugo de parcha',                  desc:'Jarra con hielo, por persona.',                       precio:2.5, costo:0.5 },
    { nombre:'Coquito',                         desc:'Receta de la casa. Disponible en temporada navideña.', precio:3.5, costo:1.1 },
    { nombre:'Café puertorriqueño y té',        desc:'Estación de servicio durante todo el evento.',        precio:2,   costo:0.3 } ]},
];

/* ---------- utilidades ---------- */

const $ = (sel, root = document) => root.querySelector(sel);
const dinero = n => new Intl.NumberFormat('es-US', { style:'currency', currency:'USD', maximumFractionDigits:0 }).format(n);
const dinero2 = n => new Intl.NumberFormat('es-US', { style:'currency', currency:'USD', minimumFractionDigits:2 }).format(n);
const pct = n => new Intl.NumberFormat('es-US', { style:'percent', maximumFractionDigits:0 }).format(n);
const suma = (arr, f) => arr.reduce((t, x) => t + f(x), 0);
const parte = iso => { const [y, m, d] = iso.split('-').map(Number); return { y, m, d }; };
const formatoCorto = new Intl.DateTimeFormat('es', { day:'numeric', month:'short' });
const corta = iso => { const { y, m, d } = parte(iso); return formatoCorto.format(new Date(y, m - 1, d)).replace('.', ''); };
const clase = { Boda:'blu', Corporativo:'grn', Social:'yel', Cita:'gry' };
const claseEstado = { Pagada:'grn', Pendiente:'yel', Vencida:'red' };
const claseMargen = m => (m >= 0.30 ? 'grn' : m >= 0.25 ? 'yel' : 'red');
const kpi = (i, etiqueta, valor, nota, tag) =>
  `<article class="card kpi" style="--i:${i}"><span class="tag ${tag}">${etiqueta}</span><div class="num">${valor}</div><p class="muted">${nota}</p></article>`;

const costos = t => t.comida + t.personal + t.logistica + t.otros;

function porMes() {
  const meses = {};
  trabajos.forEach(t => {
    const clave = t.fecha.slice(0, 7);
    meses[clave] ??= { clave, ingresos:0, variables:0 };
    meses[clave].ingresos += t.ingresos;
    meses[clave].variables += costos(t);
  });
  return Object.values(meses).map(m => {
    const neta = m.ingresos - m.variables - GASTOS_FIJOS_MES;
    return { ...m, fijos:GASTOS_FIJOS_MES, neta, margen:neta / m.ingresos, mes:parte(m.clave + '-01').m };
  });
}

/* ---------- Resumen ---------- */

function pintarResumen() {
  const septiembre = porMes().find(m => m.clave === '2026-09');
  const porCobrar = facturas.filter(f => f.estado !== 'Pagada');
  const proximos = agenda.filter(e => e.fecha >= HOY && e.tipo !== 'Cita');
  const vencidas = facturas.filter(f => f.estado === 'Vencida');

  $('#kpis').innerHTML =
    kpi(0, 'Ingresos', dinero(septiembre.ingresos), 'Facturado en eventos de septiembre.', 'blu') +
    kpi(1, 'Utilidad neta', dinero(septiembre.neta), `Margen neto de ${pct(septiembre.margen)} después de gastos fijos.`, 'grn') +
    kpi(2, 'Por cobrar', dinero(suma(porCobrar, totalDe)), `${porCobrar.length} facturas abiertas, ${vencidas.length} vencida.`, 'yel') +
    kpi(3, 'Eventos próximos', String(proximos.length), 'Confirmados de aquí a diciembre.', 'gry');

  const estadistica = (valor, etiqueta) => `<div><b>${valor}</b><span>${etiqueta}</span></div>`;
  $('#perfilStats').innerHTML =
    estadistica(trabajos.length, 'Eventos realizados') +
    estadistica(new Intl.NumberFormat('es-US').format(suma(trabajos, t => t.invitados)), 'Invitados atendidos') +
    estadistica(proximos.length, 'Eventos confirmados');

  $('#proximos').innerHTML = agenda.filter(e => e.fecha >= HOY).slice(0, 4).map(e => {
    const { d, m } = parte(e.fecha);
    return `<li>
      <div class="date"><strong>${d}</strong>${MESES_CORTO[m - 1]}</div>
      <div><b>${e.titulo}</b><span class="muted">${e.hora} · ${e.lugar}</span></div>
      <span class="tag ${clase[e.tipo]}">${e.tipo}</span></li>`;
  }).join('');

  $('#porCobrar').innerHTML = [...porCobrar].sort((a, b) => a.vence.localeCompare(b.vence)).slice(0, 4).map(f =>
    `<li>
      <span class="tag ${claseEstado[f.estado]}">${f.estado}</span>
      <div><b>${f.cliente}</b><span class="muted">Vence ${corta(f.vence)}</span></div>
      <span class="amt">${dinero(totalDe(f))}</span></li>`).join('');
}

// Respuesta de demostración: las cifras salen de los datos de la página, no de una IA real.
function analisisDemo() {
  const peor = [...trabajos].sort((a, b) => margenEvento(a) - margenEvento(b))[0];
  const vencida = facturas.find(f => f.estado === 'Vencida');
  const dias = Math.round((new Date(HOY) - new Date(vencida.vence)) / 86400000);
  const octubre = agenda.filter(e => e.fecha.startsWith('2026-10') && e.tipo !== 'Cita');
  const semanaFuerte = agenda.filter(e => e.fecha >= '2026-10-17' && e.fecha <= '2026-10-24' && e.tipo !== 'Cita');
  return [
    { t:`Cobra la factura ${vencida.id} esta semana.`,
      d:`${vencida.cliente} debe ${dinero(totalDe(vencida))} y lleva ${dias} días vencida. Es la principal fuga de efectivo del mes.` },
    { t:`Revisa el precio de eventos como “${peor.nombre}”.`,
      d:`Su margen fue de ${pct(margenEvento(peor))}, el más bajo del periodo. Personal y comida pesan más de lo planeado; sube el precio por persona o ajusta el menú.` },
    { t:'Planifica el personal del 17 al 24 de octubre.',
      d:`Hay ${semanaFuerte.length} eventos en 8 días, entre ellos la gala de 200 invitados. Confirma cocineros y meseros desde ahora, y pide con tiempo el pernil y los plátanos. Octubre suma ${octubre.length} eventos.` },
  ];
}

function iniciarIA() {
  const septiembre = porMes().find(m => m.clave === '2026-09');
  const abiertas = facturas.filter(f => f.estado !== 'Pagada');
  const entradas = [
    ['Ingresos de septiembre', dinero(septiembre.ingresos)],
    ['Costos variables y fijos', dinero(septiembre.variables + septiembre.fijos)],
    ['Margen neto', pct(septiembre.margen)],
    ['Facturas por cobrar', `${abiertas.length} · ${dinero(suma(abiertas, totalDe))}`],
    ['Eventos confirmados', String(agenda.filter(e => e.fecha >= HOY && e.tipo !== 'Cita').length)],
  ];
  $('#iaEntradas').innerHTML = entradas.map(([n, v]) =>
    `<li><b>${n}</b><span class="amt">${v}</span></li>`).join('');

  const boton = $('#btnIA');
  const salida = $('#iaSalida');
  boton.addEventListener('click', () => {
    boton.disabled = true;
    salida.innerHTML = '<p class="pending">Analizando las cifras del mes…</p>';
    setTimeout(() => {
      salida.innerHTML = analisisDemo().map((r, i) =>
        `<div class="rec"><span class="n">0${i + 1}</span><div><b>${r.t}</b><br><span class="muted">${r.d}</span></div></div>`).join('') +
        '<p class="aviso">Respuesta de demostración generada con los datos de esta página.</p>';
      boton.disabled = false;
      boton.textContent = 'Analizar de nuevo';
    }, 900);
  });
}

/* ---------- Calendario ---------- */

let calAnio = 2026, calMes = 9; // octubre (0 = enero)

function pintarCalendario() {
  $('#calTitulo').textContent = `${MESES[calMes][0].toUpperCase()}${MESES[calMes].slice(1)} ${calAnio}`;
  const primero = new Date(calAnio, calMes, 1);
  const inicio = (primero.getDay() + 6) % 7; // semana empieza en lunes
  const diasMes = new Date(calAnio, calMes + 1, 0).getDate();
  const diasPrev = new Date(calAnio, calMes, 0).getDate();
  let html = ['L','M','X','J','V','S','D'].map(d => `<div class="dow">${d}</div>`).join('');

  for (let i = 0; i < 42; i++) {
    const n = i - inicio + 1;
    const fuera = n < 1 || n > diasMes;
    const f = new Date(calAnio, calMes, n);
    const iso = `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, '0')}-${String(f.getDate()).padStart(2, '0')}`;
    const evs = agenda.filter(e => e.fecha === iso);
    const dia = fuera ? (n < 1 ? diasPrev + n : n - diasMes) : n;
    html += `<div class="${fuera ? 'out' : ''} ${iso === HOY ? 'hoy' : ''}">
      <span class="n">${dia}</span>
      <div class="evs">${evs.map(e => `<span class="chip ${clase[e.tipo]}" title="${e.hora} · ${e.titulo}">${e.titulo}</span>`).join('')}</div></div>`;
  }
  $('#calGrid').innerHTML = html;

  const clave = `${calAnio}-${String(calMes + 1).padStart(2, '0')}`;
  const delMes = agenda.filter(e => e.fecha.startsWith(clave));
  $('#agenda').innerHTML = delMes.length ? delMes.map(e => {
    const { d, m } = parte(e.fecha);
    return `<li>
      <div class="date"><strong>${d}</strong>${MESES_CORTO[m - 1]}</div>
      <div><b>${e.titulo}</b><span class="muted">${e.hora} · ${e.lugar}<br>${e.invitados} ${e.tipo === 'Cita' ? 'personas' : 'invitados'}${e.total ? ' · ' + dinero(e.total) : ''}</span></div>
      <span class="tag ${clase[e.tipo]}">${e.tipo}</span></li>`;
  }).join('') : '<li><span></span><p class="muted">No hay eventos ni citas este mes.</p><span></span></li>';
}

function iniciarCalendario() {
  const mover = d => { calMes += d; if (calMes < 0) { calMes = 11; calAnio--; } if (calMes > 11) { calMes = 0; calAnio++; } pintarCalendario(); };
  $('#calPrev').addEventListener('click', () => mover(-1));
  $('#calNext').addEventListener('click', () => mover(1));
  pintarCalendario();
}

/* ---------- Facturación ---------- */

function pintarFacturas(filtro = 'todas') {
  $('#facBody').innerHTML = facturas
    .filter(f => filtro === 'todas' || f.estado === filtro)
    .sort((a, b) => b.emitida.localeCompare(a.emitida))
    .map(f => `<tr>
      <td class="mono">${f.id}</td>
      <td><b>${f.cliente}</b><small>${f.concepto}</small></td>
      <td>${corta(f.emitida)}</td><td>${corta(f.vence)}</td>
      <td class="r">${dinero(f.subtotal)}</td><td class="r">${dinero(ivuDe(f))}</td><td class="r"><b>${dinero(totalDe(f))}</b></td>
      <td><span class="tag ${claseEstado[f.estado]}">${f.estado}</span></td></tr>`).join('');
}

function iniciarFacturacion() {
  const total = suma(facturas, totalDe);
  const suma$ = e => suma(facturas.filter(f => f.estado === e), totalDe);
  $('#facKpis').innerHTML =
    kpi(0, 'Facturado', dinero(total), `${facturas.length} facturas desde agosto, con IVU incluido.`, 'blu') +
    kpi(1, 'Cobrado', dinero(suma$('Pagada')), `${pct(suma$('Pagada') / total)} del total facturado.`, 'grn') +
    kpi(2, 'Pendiente', dinero(suma$('Pendiente')), 'Dentro de su plazo de pago.', 'yel') +
    kpi(3, 'Vencido', dinero(suma$('Vencida')), 'Requiere seguimiento con el cliente.', 'red');
  pintarFacturas();
  $('#facFiltros').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    document.querySelectorAll('#facFiltros button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    pintarFacturas(b.dataset.f);
  });
}

/* ---------- Rentabilidad ---------- */

const margenEvento = t => (t.ingresos - costos(t)) / t.ingresos;

function iniciarRentabilidad() {
  const meses = porMes();
  const ingresos = suma(meses, m => m.ingresos);
  const variables = suma(meses, m => m.variables);
  const fijos = suma(meses, m => m.fijos);
  const neta = ingresos - variables - fijos;

  $('#rentKpis').innerHTML =
    kpi(0, 'Ingresos', dinero(ingresos), `${trabajos.length} eventos realizados.`, 'blu') +
    kpi(1, 'Costos totales', dinero(variables + fijos), `${dinero(variables)} variables y ${dinero(fijos)} fijos.`, 'yel') +
    kpi(2, 'Utilidad neta', dinero(neta), 'Lo que queda después de todos los costos.', 'grn') +
    kpi(3, 'Margen neto', pct(neta / ingresos), 'Utilidad neta sobre ingresos.', neta / ingresos >= 0.15 ? 'grn' : 'yel');

  const maximo = Math.max(...meses.map(m => Math.max(m.ingresos, m.variables + m.fijos)));
  $('#rentBars').innerHTML =
    `<div class="bars" role="img" aria-label="Ingresos y costos por mes, detallados en la tabla de abajo">${meses.map(m => `
      <div class="bcol"><div class="bpair">
        <i class="b1" style="height:${m.ingresos / maximo * 100}%"></i>
        <i class="b2" style="height:${(m.variables + m.fijos) / maximo * 100}%"></i></div>
        <span>${MESES_CORTO[m.mes - 1]}</span></div>`).join('')}</div>
     <p class="key"><span><i class="b1"></i>Ingresos</span><span><i class="b2"></i>Costos</span></p>`;

  const categorias = [
    ['Comida e ingredientes', suma(trabajos, t => t.comida)],
    ['Personal', suma(trabajos, t => t.personal)],
    ['Logística y transporte', suma(trabajos, t => t.logistica)],
    ['Otros', suma(trabajos, t => t.otros)],
    ['Gastos fijos', fijos],
  ];
  const totalCostos = suma(categorias, c => c[1]);
  $('#rentCostos').innerHTML = categorias.map(([n, v]) => `
    <div class="cost-row"><div><b>${n}</b><span>${dinero(v)} · ${pct(v / totalCostos)}</span></div>
    <div class="meter"><i style="width:${v / totalCostos * 100}%"></i></div></div>`).join('');

  $('#rentMeses').innerHTML = meses.map(m => `<tr>
    <td><b>${MESES[m.mes - 1][0].toUpperCase()}${MESES[m.mes - 1].slice(1)}</b></td>
    <td class="r">${dinero(m.ingresos)}</td><td class="r">${dinero(m.variables)}</td><td class="r">${dinero(m.fijos)}</td>
    <td class="r"><b>${dinero(m.neta)}</b></td><td class="r">${pct(m.margen)}</td></tr>`).join('');

  $('#rentEventos').innerHTML = [...trabajos].reverse().map(t => {
    const util = t.ingresos - costos(t), mg = margenEvento(t);
    return `<tr><td>${corta(t.fecha)}</td><td><b>${t.nombre}</b></td><td class="r">${t.invitados}</td>
      <td class="r">${dinero(t.ingresos)}</td><td class="r">${dinero(costos(t))}</td><td class="r">${dinero(util)}</td>
      <td><span class="tag ${claseMargen(mg)}">${pct(mg)}</span></td></tr>`;
  }).join('');
}

/* ---------- Menú ---------- */

function iniciarMenu() {
  $('#paquetes').innerHTML = paquetes.map((p, i) => `
    <article class="card pack" style="--i:${i}">
      <span class="eyebrow">Paquete</span><h2>${p.nombre}</h2>
      <div class="price">${dinero(p.precio)}<small> por persona</small></div>
      <p class="muted">${p.detalle}</p>
      <ul>${p.incluye.map(x => `<li>${x}</li>`).join('')}</ul></article>`).join('');

  $('#carta').innerHTML = carta.map((c, i) => `
    <article class="card cat" style="--i:${i}">
      <h2>${c.categoria}</h2>
      <div class="table-wrap" tabindex="0" role="region" aria-label="${c.categoria}">
        <table>
          <thead><tr><th scope="col">Plato</th><th scope="col" class="r">Precio</th><th scope="col" class="r">Costo</th><th scope="col">Margen</th></tr></thead>
          <tbody>${c.platos.map(p => {
            const mg = (p.precio - p.costo) / p.precio;
            return `<tr><td><b>${p.nombre}</b><small>${p.desc}</small></td>
              <td class="r">${dinero2(p.precio)}</td><td class="r">${dinero2(p.costo)}</td>
              <td><span class="tag ${mg >= 0.65 ? 'grn' : mg >= 0.55 ? 'yel' : 'red'}">${pct(mg)}</span></td></tr>`;
          }).join('')}</tbody>
        </table>
      </div>
    </article>`).join('');
}

/* ---------- navegación ---------- */

const titulos = { resumen:'Resumen', calendario:'Calendario', facturacion:'Facturación', rentabilidad:'Rentabilidad', menu:'Menú', analisis:'Análisis IA' };

function mostrar() {
  const id = titulos[location.hash.slice(1)] ? location.hash.slice(1) : 'resumen';
  document.querySelectorAll('.page').forEach(p => { p.hidden = p.id !== id; });
  document.querySelectorAll('.side nav a').forEach(a => {
    if (a.dataset.page === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  document.title = `${titulos[id]} · Seis Figuras · Casa Alba Catering`;
  window.scrollTo(0, 0);
  $(`#${id} h1`).focus({ preventScroll:true });
}

pintarResumen();
iniciarIA();
iniciarCalendario();
iniciarFacturacion();
iniciarRentabilidad();
iniciarMenu();
window.addEventListener('hashchange', mostrar);
mostrar();
