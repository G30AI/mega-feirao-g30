/* =====================================================================
   Mega Feirão G30 — comportamento da página
   Depende de assets/dados.js
   ===================================================================== */

const esc = (t) => String(t).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const el = (id) => document.getElementById(id);

const store = {
  get(k, fallback) { try { const v = localStorage.getItem('mfg30:' + k); return v === null ? fallback : v; } catch { return fallback; } },
  set(k, v) { try { localStorage.setItem('mfg30:' + k, v); } catch { /* modo privado */ } }
};

/* ============================ navegação ============================ */
function renderNav() {
  el('nav').innerHTML = ABAS.map((t) =>
    `<button class="nav__link" data-tab="${t.id}" onclick="switchTab('${t.id}')">${esc(t.nome)}</button>`
  ).join('');
}

function switchTab(id, opts = {}) {
  if (!el('tab-' + id)) id = 'main';

  document.querySelectorAll('.tab').forEach((t) => t.classList.remove('is-on'));
  el('tab-' + id).classList.add('is-on');

  const nav = el('nav');
  document.querySelectorAll('.nav__link').forEach((b) => {
    const on = b.dataset.tab === id;
    b.classList.toggle('is-on', on);
    // rola o carrossel do menu, nunca a página (scrollIntoView mexeria nas duas)
    if (on && nav.scrollWidth > nav.clientWidth) {
      nav.scrollLeft = b.offsetLeft - (nav.clientWidth - b.offsetWidth) / 2;
    }
  });

  document.querySelectorAll('video').forEach((v) => v.pause());
  if (!opts.silent) window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', '#' + id);
}

/* ============================ painel de metas ============================ */
let vendas = 0;

function addSale()   { vendas += 1; store.set('vendas', vendas); paintKpi(); }
function resetSales() { vendas = 0;  store.set('vendas', vendas); paintKpi(); }

function paintKpi() {
  const meta = CONFIG.evento.meta;
  el('salesNow').textContent = vendas;
  el('salesFill').style.width = Math.min((vendas / meta) * 100, 100) + '%';
  el('salesDone').hidden = vendas < meta;
}

/* ============================ contador regressivo ============================ */
/* Três estados: antes da Live, durante os três dias, e depois. O tique só roda
   enquanto a aba está visível — em segundo plano não há o que atualizar.      */
let tique = null;

function iniciaContador() {
  const box = el('countdown');
  const inicio = new Date(CONFIG.evento.inicioISO);
  const fim = new Date(CONFIG.evento.fimISO);

  if (isNaN(inicio) || isNaN(fim)) { box.remove(); return; }  // data inválida: some em vez de mentir

  box.hidden = false;
  pintaContador(inicio, fim);

  const liga = () => { if (!tique) tique = setInterval(() => pintaContador(inicio, fim), 1000); };
  const desliga = () => { clearInterval(tique); tique = null; };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { desliga(); } else { pintaContador(inicio, fim); liga(); }
  });
  liga();
}

function pintaContador(inicio, fim) {
  const box = el('countdown');
  const agora = Date.now();
  const doisDigitos = (n) => String(n).padStart(2, '0');

  if (agora >= fim) {                       // acabou
    box.classList.remove('is-live');
    box.classList.add('is-over');
    el('cdLabel').textContent = 'Encerrado';
    el('cdWhen').textContent = 'O ' + CONFIG.evento.edicao + ' aconteceu em ' + CONFIG.evento.datasLongo + '. Os materiais continuam aqui.';
    clearInterval(tique); tique = null;
    return;
  }

  const acontecendo = agora >= inicio;
  const alvo = acontecendo ? fim : inicio;
  box.classList.toggle('is-live', acontecendo);

  el('cdLabel').textContent = acontecendo ? 'O Mega Feirão está acontecendo' : 'Faltam para o Mega Feirão';
  el('cdWhen').textContent = acontecendo
    ? 'Encerra no fim do sábado, dia 24. Aproveite cada hora.'
    : CONFIG.evento.liveTexto;

  let resta = Math.floor((alvo - agora) / 1000);
  const dias = Math.floor(resta / 86400); resta -= dias * 86400;
  const horas = Math.floor(resta / 3600);  resta -= horas * 3600;
  const min = Math.floor(resta / 60);
  const seg = resta - min * 60;

  el('cdD').textContent = doisDigitos(dias);
  el('cdH').textContent = doisDigitos(horas);
  el('cdM').textContent = doisDigitos(min);
  el('cdS').textContent = doisDigitos(seg);
}

/* ============================ os três dias, em destaque ============================ */
function renderEventDays() {
  el('eventDaysTitle').textContent = CONFIG.evento.subtitulo;
  el('eventDays').innerHTML = CONFIG.dias.map((d) => `
    <div class="eventday">
      <span class="eventday__n">${esc(d.dia)}</span>
      <span class="eventday__w">${esc(d.label.replace('-feira', ''))}</span>
    </div>`).join('');
}

/* ============================ checklist ============================ */
/* A marcação é guardada pelo TEXTO do item, não pela posição: assim, tirar ou
   reordenar um item da lista não desloca o que a loja já tinha marcado.        */
function idDoItem(texto) {
  let h = 5381;
  for (let i = 0; i < texto.length; i++) h = ((h << 5) + h + texto.charCodeAt(i)) | 0;
  return 'i' + (h >>> 0).toString(36);
}

function renderChecklist() {
  el('checklist').innerHTML = CONFIG.checklist.map((item) => `
    <label class="check">
      <input type="checkbox" data-check="${idDoItem(item)}" onchange="saveChecklist()">
      <span class="check__box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
      </span>
      <span class="check__text">${esc(item)}</span>
    </label>`).join('');

  try {
    JSON.parse(store.get('checklist', '[]')).forEach((id) => {
      const box = document.querySelector(`[data-check="${id}"]`);
      if (box) box.checked = true;
    });
  } catch { /* nada salvo */ }
}

function saveChecklist() {
  const on = [...document.querySelectorAll('[data-check]')].filter((b) => b.checked).map((b) => b.dataset.check);
  store.set('checklist', JSON.stringify(on));
}

/* ============================ criativos ============================ */
function renderCriativos() {
  el('listaCriativos').innerHTML = CRIATIVOS.map((c) => {
    const temCarro = Boolean(c.videos.carro);
    const beats = c.roteiro.map(([t, d]) =>
      `<div class="beat"><span class="beat__t">${esc(t)}</span><span class="beat__d">${esc(d)}</span></div>`).join('');

    return `
    <article class="card card--flush card--hover creative">
      <div class="creative__main">
        <span class="creative__ghost" aria-hidden="true">${esc(c.n)}</span>
        <div class="creative__top">
          <span class="creative__n">${esc(c.n)}</span>
          <span class="chip">${esc(c.angulo)}</span>
        </div>
        <h3 class="h2">${esc(c.titulo)}</h3>
        <p class="sm creative__premise">${esc(c.premissa)}</p>

        <div class="creative__script">${beats}</div>

        <p class="eyebrow creative__rule">Vertical 9:16 · cortes rápidos · legenda grande</p>
      </div>

      <div class="creative__media">
        <div class="seg">
          <button class="seg__btn is-on" onclick="setSeg('${c.n}','moto',this)">Moto</button>
          <button class="seg__btn" onclick="setSeg('${c.n}','carro',this)"${temCarro ? '' : ' disabled title="Versão de carro não entregue"'}>Carro</button>
        </div>
        <video class="creative__video" id="vid-${c.n}" controls playsinline preload="none"
               poster="videos/posters/${c.videos.moto}.jpg" src="videos/${c.videos.moto}.mp4"></video>
        <p class="xs creative__cap" id="cap-${c.n}">Execução real · <span class="strong">${esc(LOJAS.moto)}</span></p>
        ${temCarro ? '' : '<p class="creative__warn">A versão de carro deste criativo não foi entregue.</p>'}
      </div>
    </article>`;
  }).join('');
}

function setSeg(n, seg, btn) {
  const c = CRIATIVOS.find((x) => x.n === n);
  const slug = c && c.videos[seg];
  if (!slug) return;

  const v = el('vid-' + n);
  v.pause();
  v.src = 'videos/' + slug + '.mp4';
  v.poster = 'videos/posters/' + slug + '.jpg';
  v.load();

  el('cap-' + n).innerHTML = 'Execução real · <span class="strong">' + esc(LOJAS[seg]) + '</span>';
  [...btn.parentElement.children].forEach((b) => b.classList.remove('is-on'));
  btn.classList.add('is-on');
}

/* ============================ cases ============================ */
function renderCases() {
  el('listaCases').innerHTML = CASES.map((c) => `
    <article class="card card--flush card--hover case">
      <video class="case__video case__video--${esc(c.formato)}" controls playsinline preload="none"
             poster="videos/posters/${esc(c.slug)}.jpg" src="videos/${esc(c.slug)}.mp4"></video>
      <div class="case__body">
        <div class="case__top">
          <h3 class="h3">${esc(c.titulo)}</h3>
          <span class="chip">${esc(c.duracao)}</span>
        </div>
        <p class="sm mt-3">${esc(c.resumo)}</p>
        <p class="eyebrow eyebrow--brand case__label">O que observar</p>
        <p class="sm">${esc(c.olhar)}</p>
      </div>
    </article>`).join('');
}

/* ============================ calendário ============================ */
function renderCronograma() {
  el('cronograma').innerHTML = CONFIG.cronograma.map((e) => `
    <div class="card slot${e.destaque ? ' slot--destaque' : ''}">
      <div class="slot__when">
        <p class="slot__date">${esc(e.data)}</p>
        <p class="slot__week">${esc(e.semana)}</p>
        ${e.hora ? `<p class="slot__time">${esc(e.hora)}</p>` : ''}
      </div>
      <span class="slot__rule"></span>
      <div>
        <h4 class="h4">${esc(e.titulo)}</h4>
        ${e.desc ? `<p class="sm mt-3">${esc(e.desc)}</p>` : ''}
        ${e.local ? `<p class="xs slot__local">📍 ${esc(e.local)}</p>` : ''}
      </div>
    </div>`).join('');

  el('dias').innerHTML = CONFIG.dias.map((d) => `
    <div class="card day">
      <p class="day__n">${esc(d.dia)}</p>
      <p class="day__label">${esc(d.label)}</p>
      <p class="eyebrow day__note">${esc(d.nota)}</p>
    </div>`).join('');
}

/* ============================ tráfego ============================ */
function renderFases() {
  el('fases').innerHTML = CONFIG.fases.map((f) => `
    <tr>
      <td class="is-key">${esc(f.periodo)}</td>
      <td><span class="tag tag--${esc(f.cor)}">${esc(f.fase)}</span></td>
      <td class="is-key">${esc(f.acao)}</td>
      <td>${esc(f.detalhe)}</td>
    </tr>`).join('');
}

/* ============================ execução ============================ */
function renderRetencao() {
  el('retencao').innerHTML = RETENCAO.map((r) =>
    `<p class="sm"><span class="accent">✓</span>&nbsp;&nbsp;${esc(r)}</p>`).join('');
}

/* ============================ Gideão ============================ */
function renderGideao() {
  el('gideao').innerHTML = GIDEAO.map((g) => `
    <div class="card card--pad">
      <div class="row mb-4">
        <h3 class="h3">${esc(g.grupo)}</h3>
        ${g.destaque ? `<span class="chip chip--brand">${esc(g.destaque)}</span>` : ''}
      </div>
      <div class="stack stack--sm">
        ${g.prompts.map((p) => `
          <button class="prompt" onclick="copy(this, ${JSON.stringify(p).replace(/"/g, '&quot;')})">
            <span>${esc(p)}</span><span class="prompt__copy">copiar</span>
          </button>`).join('')}
      </div>
    </div>`).join('');
}

/* ============================ pré-vendas ============================ */
function renderObjecoes() {
  el('objecoes').innerHTML = OBJECOES.map((o, i) => `
    <div class="card card--flush">
      <button class="acc__head" onclick="toggleAcc(${i})" aria-expanded="false" aria-controls="acc-${i}">
        <span class="acc__q">
          <span class="chip chip--brand">${esc(o.tag)}</span>
          <span class="h4">${esc(o.pergunta)}</span>
        </span>
        <span class="acc__sign" id="acc-sign-${i}">+</span>
      </button>
      <div class="acc__body" id="acc-${i}" hidden>
        <p class="eyebrow">Resposta ideal</p>
        <p class="sm acc__answer">${esc(o.resposta)}</p>
        <button class="btn btn--ghost" onclick="copy(this, ${JSON.stringify(o.resposta).replace(/"/g, '&quot;')})">Copiar resposta</button>
      </div>
    </div>`).join('');
}

function toggleAcc(i) {
  const body = el('acc-' + i);
  const open = body.hidden;
  body.hidden = !open;
  el('acc-sign-' + i).textContent = open ? '−' : '+';
  body.previousElementSibling.setAttribute('aria-expanded', String(open));
}

function renderMensagens() {
  el('mensagens').innerHTML = MENSAGENS.map((m) => `
    <div class="card msg">
      <div class="msg__head">
        <span class="msg__n">${m.n}</span>
        <h4 class="h4">${esc(m.titulo)}</h4>
      </div>
      <p class="sm msg__text">${esc(m.texto)}</p>
      <div><button class="btn btn--ghost" onclick="copy(this, ${JSON.stringify(m.texto).replace(/"/g, '&quot;')})">Copiar</button></div>
    </div>`).join('');
}

/* ============================ copiar ============================ */
function copy(btn, text) {
  const done = () => {
    const alvo = btn.querySelector('.prompt__copy') || btn;
    const antes = alvo.textContent;
    alvo.textContent = 'copiado';
    setTimeout(() => { alvo.textContent = antes; }, 1400);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallback(text, done));
  } else {
    fallback(text, done);
  }
}

function fallback(text, done) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); done(); } catch { /* sem permissão */ }
  ta.remove();
}

/* ============================ boot ============================ */
document.addEventListener('DOMContentLoaded', () => {
  // o que vem do CONFIG e aparece em HTML estático
  el('salesGoal').textContent  = CONFIG.evento.meta;
  el('heroStores').textContent = CONFIG.evento.lojas + ' lojas';
  el('heroPartner').textContent = 'com ' + CONFIG.evento.parceiro;
  el('factDates').innerHTML    = CONFIG.evento.datasCurto;
  el('factStores').innerHTML   = 'Exclusivo para<br>' + CONFIG.evento.lojas + ' lojas G30';
  el('ctaSuporte').href        = CONFIG.links.suporte;

  renderNav();
  iniciaContador();
  renderEventDays();
  renderChecklist();
  renderCriativos();
  renderCases();
  renderCronograma();
  renderFases();
  renderRetencao();
  renderGideao();
  renderObjecoes();
  renderMensagens();

  vendas = parseInt(store.get('vendas', '0'), 10) || 0;
  paintKpi();

  switchTab((location.hash || '#main').slice(1), { silent: true });
  // o browser rola sozinho ao ver o hash; a aba já é a certa, então volta ao topo
  window.scrollTo(0, 0);
});
