# Mega Feirão G30 — Hub das Lojas

Hub interno do Mega Feirão G30: plano de criativos com os vídeos de referência,
cronograma, tráfego pago, execução de gravação e scripts de pré-venda.

Sucessor do [Megafeirao2.0](https://g30ia.github.io/Megafeirao2.0/), que era do
2º Feirão (carros, 25–27/jun). Esta edição cobre **carros e motos**, acontece de
**22 a 24 de outubro** e é dirigida a lojas **já inscritas** — por isso a página
não tem seção de venda nem formulário.

Sete abas: O Feirão, Criativos, Cases, Calendário, Tráfego, Execução e Pré-vendas.

> ⚠️ **Alguns dados ainda são de exemplo** — meta do painel, número de lojas,
> cronograma e links. A página não os marca mais visualmente (as marcas saíram
> quando o conteúdo foi aprovado), então o registro vive só em
> [DADOS-PENDENTES.md](DADOS-PENDENTES.md).

## Como rodar

Página estática, sem build. Abrir `index.html` no navegador já funciona, mas os
vídeos e o `localStorage` se comportam melhor sob um servidor:

```bash
python -m http.server 8080
# http://localhost:8080
```

## Publicar no GitHub Pages

Settings → Pages → Source: `Deploy from a branch` → branch `main`, pasta `/ (root)`.
O `.nojekyll` impede o Jekyll de processar o conteúdo.

## Estrutura

```
index.html                   só a marcação, sem estilo inline
assets/
  style.css                  sistema de design: tokens, escala tipográfica, componentes
  dados.js                   TODO o conteúdo (CONFIG, criativos, prompts, scripts)
  app.js                     render e comportamento
  g30-logo.png               logo oficial da plataforma (frontend/web)
  infografico-plano-criativos.jpg
  plano-criativos-mega-feirao-g30.pdf
videos/                      17 vídeos em H.264 com faststart (128 MB)
  criativo-* / loja-*        os 6 criativos, nas versões de moto e de carro
  case-*                     6 cases das edições passadas
  posters/                   capa de cada vídeo
materiais-apoio/                 originais em HEVC dos criativos — fora do git
materiais-mega-feirao-passado/   originais dos cases — fora do git
```

Sem framework e sem build. A única dependência externa é a fonte Inter, do Google
Fonts; se ela não carregar, a página cai para a fonte de sistema sem quebrar.

## Sistema de design

Nenhum tamanho de fonte é escrito solto no HTML. Tudo vem de tokens no `:root` de
`assets/style.css` e de classes nomeadas:

| Camada | Classes |
| --- | --- |
| Tipografia | `.display` `.h1` `.h2` `.h3` `.h4` `.lead` `.body` `.sm` `.xs` `.eyebrow` |
| Superfície | `.card` (`--pad` `--flush` `--hover` `--inset`) e `.panel` |
| Ação | `.btn` (`--primary` `--ghost` `--lg`), `.chip`, `.tag` |
| Layout | `.wrap` `.section` `.grid--2/3/4` `.stack` |

A escala usa `clamp()`, então os tamanhos acompanham a largura da tela sem
breakpoint — é o que impede os títulos de quebrarem mal no meio do caminho.
Para mudar a cor da marca, basta `--brand` no `:root`.

## Os vídeos

Os 12 arquivos originais vieram em **HEVC (H.265)**, que **não toca no Chrome,
Firefox nem Edge** — só no Safari. Foram transcodados para H.264 + AAC:

| | Antes | Depois |
| --- | --- | --- |
| Codec | HEVC (`hvc1`) | H.264 (`avc1`) + AAC |
| Resolução | 1080×1920 e 2160×3840 | 720×1280 |
| Total | 593 MB | **57 MB** |

Uma duplicata exata (`IMG_3502 (1).MP4`) foi descartada.

Os **cases das edições passadas** já vinham em H.264 (saíram do WhatsApp, a
~1 Mbps). Foram só remuxados com `faststart`, sem recomprimir — recomprimir uma
fonte já comprimida degradaria à toa. Também aí havia uma duplicata exata.

São **dois conjuntos paralelos**: o mesmo plano de 6 criativos executado por duas
lojas — **Suzuki Moto Marques** (motos) e **Goiânia Veículos** (carros). A aba
*Criativos* mostra os dois lado a lado, com um alternador por card.

Falta a versão de carro do criativo 06.

### Reconverter um vídeo

```bash
ffmpeg -i entrada.MOV \
  -vf "scale=720:1280:force_original_aspect_ratio=decrease" \
  -c:v libx264 -profile:v high -level 4.0 -preset slow -crf 26 -pix_fmt yuv420p \
  -c:a aac -b:a 96k -ac 2 -movflags +faststart saida.mp4

# poster
ffmpeg -ss 1 -i saida.mp4 -frames:v 1 -vf "scale=480:-1" -q:v 5 posters/saida.jpg
```

## Onde mexer

| Quero mudar | Onde |
| --- | --- |
| Datas, meta, links, cronograma, fases, checklist | `CONFIG`, em `assets/dados.js` |
| Alvo do contador regressivo | `CONFIG.evento.inicioISO` / `fimISO` (offset de Brasília fixo) |
| Os três dias em destaque no hero | `CONFIG.dias` — os mesmos que alimentam o Calendário |
| Roteiros dos criativos e qual vídeo cada um usa | `CRIATIVOS`, em `assets/dados.js` |
| Os cases das edições passadas | `CASES`, em `assets/dados.js` |
| Prompts do Gideão, objeções, mensagens MAPA | `GIDEAO`, `OBJECOES`, `MENSAGENS` |
| Nomes e ordem das abas | `ABAS`, em `assets/dados.js` |
| Cor, espaçamento, tipografia | tokens no `:root` de `assets/style.css` |

## Créditos

Plano de criativos: **Thairone Dantas**. Conteúdo de pré-venda e prompts do
Gideão herdados do hub do 2º Mega Feirão G30.
