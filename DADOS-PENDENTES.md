# Dados pendentes

O conteúdo foi aprovado pelo marketing, então **a página não marca mais nada
visualmente** — o aviso do topo, o botão de ocultar marcas e os realces laranja
saíram em 29/09. Este arquivo passou a ser o **único registro** do que ainda é
provisório.

Quase tudo o que é volátil está no objeto `CONFIG`, no topo de
**`assets/dados.js`** — mexer lá resolve datas, meta, lojas, links, cronograma,
dias do evento, fases de tráfego e checklist de uma vez.

> Sem as marcas na tela, nada denuncia um valor provisório para quem abre a
> página. Vale conferir esta lista antes de mostrar o site a alguém de fora.

---

## 1. Evento — `CONFIG.evento` (assets/dados.js)

| Campo | Valor provisório | O que preciso |
| --- | --- | --- |
| `edicao` | `3º Mega Feirão G30` | É a 3ª edição? O anterior foi o 2º. |
| ~~`datasCurto` / `datasLongo`~~ | **`22, 23 e 24 de outubro`** | ✅ **Confirmado pelo marketing em 24/09.** Cai quinta, sexta e sábado de 2026 — confere com um feirão de três dias. |
| `ano` | `2026` | Provável: 22 a 24/10 só cai quinta–sábado em 2026. **O contador regressivo do hero depende disso** — se o ano estiver errado, ele mostra um número absurdo. Confirmar. |
| `parceiro` | `Banco Santander` | **Provavelmente correto** — os criativos 03 e 05 dizem "em parceria com o banco Santander". Confirmar se o nome aparece assim. |
| `lojas` | `200` | Quantas lojas nesta edição? |
| `meta` | `17` | Meta do painel de resultados. O anterior era 17 carros. |

## 2. Links — `CONFIG.links` (assets/dados.js)

| Campo | Valor provisório | O que preciso |
| --- | --- | --- |
| `inscricao` | `forms.gle/zGzhtkD9Szuy1rwm8` | Formulário do **2º Feirão**. Tem um novo? |
| `suporteWhats` | `wa.me/551931671538` | Suporte do 2º Feirão — `(19) 3199-1730`. Continua? |

## 3. Cronograma — ✅ **oficial**

Veio da arte **"Agenda Mega Feirão — Outubro 2026"**, recebida em 30/09/2026.
Datas, horários, local e descrições saem de lá — **as descrições deixaram de ser
minhas**. Os dias da semana foram conferidos no calendário e batem todos.

A arte está publicada em `assets/agenda-mega-feirao.jpg` e aparece no fim da aba
Calendário, com botão de baixar.

Mudou em relação à versão de 29/09: o alinhamento passou para **09h30** e ganhou
local (**Vinhedo/SP**); o segundo plantão de tráfego saiu de 14 para **15/Out**;
a **LIVE foi de 21/Out 10h–12h para 21/Out às 19h**; e o dia 21 passou a ter
**dois** compromissos (Sala de guerra às 10h e a LIVE às 19h).

## 4. Dias do evento — `CONFIG.dias` (assets/dados.js)

✅ **Resolvido.** `22 quinta / 23 sexta / 24 sábado`, conferido no calendário de 2026.

## 4b. Contador regressivo — `CONFIG.evento.inicioISO` / `fimISO`

Aponta para o **início do Mega Feirão, 22/10** (offset `-03:00` fixo, para não
depender do fuso de quem abre a página) e encerra no fim do dia 24.

Antes apontava para "a Live de abertura, 22/Out às 19h30". Com o cronograma
real, **a LIVE é na véspera — 21/Out, das 10h às 12h** — e deixou de ser a
abertura. O contador agora conta para o Feirão e cita a LIVE na linha de baixo.
Como o dia 22 não tem hora de início definida, uso o começo do dia; se houver
um horário de abertura, é só trocar em `inicioISO`.

## 5. Fases de tráfego — parcialmente resolvido

A **lógica das 4 fases** é real (hub do 2º Feirão) e a linha da LIVE acompanha o
cronograma oficial: **21/Out às 19h**. A Captação começa em 07/Out, dia em que as
primeiras campanhas sobem.

As **janelas de Captação, Agenda VIP e Otimização** continuam sendo estimativa
minha, ancoradas nos marcos reais. Confirmar com quem toca o tráfego.

## 6. Checklist de preparação — `CONFIG.checklist` (assets/dados.js)

Cinco dos seis itens vieram do 2º Feirão. O último ("Os seis criativos gravados
e publicados") foi acrescentado por fazer sentido com este plano. O item da
G30 Pay saiu em 29/09, a pedido. Confirmar a lista com o marketing.

## 7. A oferta — **removida da página** ✅

O marketing definiu em 24/09 que o público são lojas **já inscritas**, então a
seção de venda saiu inteira: custo de R$ 1.800, mensalidade zerada, combo e o
botão de inscrição. `CONFIG.links.inscricao` ficou sem uso na página — mantido
no arquivo caso a seção volte.

Também por decisão do marketing, **a G30 Pay deixou de ser obrigatória** nesta
edição. O checklist agora diz "se a loja quiser parcelar a entrada".

Duas condições citadas nos criativos continuam **fora** da página, porque não sei
se valem para a loja ou para o cliente final:

- *"até dez mil reais de desconto"* (criativo 03)
- *"até 100%"* — provavelmente financiamento (criativo 03)

## 8. Vídeo faltando

O **criativo 06 (Última chance)** só tem a versão de **moto**. A Goiânia Veículos
entregou 5 dos 6. A aba desabilita o botão "🚗 Carro" nesse card e mostra o aviso.
Se a versão existir, converta e salve como `videos/loja-06-ultima-chance.mp4`
(+ poster) e troque `carro: null` por `carro: 'loja-06-ultima-chance'` em `CRIATIVOS`, em `assets/dados.js`.

---

## O que **não** é mock

Não mexer sem motivo — é material real:

- Os **6 criativos**, ângulos, premissas e roteiros segundo a segundo → PDF do Thairone Dantas
- **Execução prática** (6 pontos), **AIDA**, **regra de ouro** → PDF, pág. 2 e 9
- **Roteiro estruturado**, **orientações de gravação**, **regras de retenção** → infográfico
- **30 prompts do Gideão**, **3 objeções**, **4 pilares MAPA**, **10 mensagens MAPA** → hub do 2º Feirão
- Os **11 vídeos de criativo** em `videos/` → Suzuki Moto Marques (motos) e Goiânia Veículos (carros)
- Os **6 cases** (`videos/case-*.mp4`) → lojas das edições passadas. Os títulos e os
  textos de "o que observar" fui eu que escrevi, a partir do que se vê em cada vídeo —
  **confira com o marketing** se a leitura está certa e se alguma loja precisa de crédito
  nominal ou autorização de uso.
