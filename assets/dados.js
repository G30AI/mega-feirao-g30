/* =====================================================================
   Mega Feirão G30 — todo o conteúdo da página

   CONFIG  ....... dados do evento. TUDO AQUI É PROVISÓRIO (ver DADOS-PENDENTES.md)
   CRIATIVOS ..... os 6 criativos do PDF do Thairone Dantas  — real
   GIDEAO ........ prompts do copiloto, do hub do 2º Feirão  — real
   OBJECOES ...... respostas de objeção, do hub do 2º Feirão — real
   MENSAGENS ..... as 10 mensagens MAPA, do hub do 2º Feirão — real
   RETENCAO ...... regras do infográfico                     — real
   ===================================================================== */

/* ⚠️ PROVISÓRIO — substituir quando os dados reais chegarem. */
const CONFIG = {
  evento: {
    edicao:     '3º Mega Feirão G30',
    datasLongo: '22, 23 e 24 de outubro',
    datasCurto: '22, 23 e 24<br>de outubro',
    ano:        2026,
    // alvo do contador: Live de abertura. Offset fixo de Brasília para não
    // depender do fuso de quem abre a página.
    inicioISO:  '2026-10-22T00:00:00-03:00',
    fimISO:     '2026-10-24T23:59:59-03:00',
    parceiro:   'Santander Financiamentos',   // provável: citado nos criativos 03 e 05
    // a LIVE deixou de ser a abertura: acontece na véspera, 21/Out das 10h às 12h
    liveTexto:  'Antes dele, a LIVE na quarta, dia 21, às 19h.',
    subtitulo:  'Mega Feirão & Black Friday Antecipada',
    lojas:      200,
    meta:       17
  },
  links: {
    inscricao: 'https://forms.gle/zGzhtkD9Szuy1rwm8',  // formulário do 2º Feirão
    suporte:   'https://wa.me/551931671538'            // suporte do 2º Feirão
  },

  checklist: [
    'Microfone externo de boa qualidade.',
    'Vídeos de prova social prontos e editados.',
    'Presença de toda a equipa nos treinamentos.',
    'Copiloto Gideão ativo durante todo o feirão.',
    'Camisa e boné Mega Feirão G30 para os vendedores.',
    'Os seis criativos gravados e publicados.'
  ],

  /* Agenda oficial — arte "AGENDA MEGA FEIRÃO, OUTUBRO 2026", recebida em
     30/09/2026. Datas, horários, local e descrições saem de lá; os dias da
     semana foram conferidos no calendário e batem todos.
     Itens sem descrição na arte ficam sem: o card não mostra a linha. */
  cronograma: [
    { data: '02/Out', semana: 'Sexta-feira',   hora: '09h30',      titulo: 'Alinhamento estratégico presencial',
      local: 'Vinhedo/SP', desc: '' },
    { data: '05/Out', semana: 'Segunda-feira', hora: '10h00',      titulo: 'Criação de conteúdo',
      desc: 'Produção de provas sociais e vídeos.' },
    { data: '07/Out', semana: 'Quarta-feira',  hora: '09h00',      titulo: 'Plantão de tráfego',
      desc: 'Subindo as primeiras campanhas.' },
    { data: '15/Out', semana: 'Quinta-feira',  hora: '09h00',      titulo: 'Plantão de tráfego',
      desc: 'Análise das campanhas.' },
    { data: '19/Out', semana: 'Segunda-feira', hora: '10h às 11h', titulo: 'Treinamento de LIVE',
      desc: '' },
    { data: '20/Out', semana: 'Terça-feira',   hora: '10h00',      titulo: 'Sala de guerra',
      desc: '' },
    { data: '21/Out', semana: 'Quarta-feira',  hora: '10h00',      titulo: 'Sala de guerra',
      desc: '' },
    { data: '21/Out', semana: 'Quarta-feira',  hora: '19h00',      titulo: 'LIVE', destaque: true,
      desc: 'Revelação das ofertas.' }
  ],

  dias: [
    { dia: '22', label: 'Quinta-feira', nota: 'Abertura' },
    { dia: '23', label: 'Sexta-feira',  nota: 'Operação máxima' },
    { dia: '24', label: 'Sábado',       nota: 'Fechamento' }
  ],

  /* a lógica das 4 fases é real (hub do 2º Feirão); só os períodos são provisórios */
  fases: [
    { periodo: '07 a 17/Out',    fase: 'Captação',   cor: 'blue',   acao: 'Autoridade e pré-aprovação', detalhe: 'Campanhas focadas em pré-aprovação com o Santander. Gerar listas mostrando que quem se antecipa garante as melhores taxas.' },
    { periodo: '18 a 21/Out',    fase: 'Agenda VIP', cor: 'purple', acao: 'Antecipação e escassez',     detalhe: 'Remarketing agressivo. Mostrar bastidores e veículos sendo preparados. Convidar forte para a lista VIP da Live.' },
    { periodo: '18 a 21/Out',    fase: 'Otimização', cor: 'warn',   acao: 'Otimização das campanhas',   detalhe: 'Ler os números diários e ajustar: pausar criativo com CPL alto, reforçar orçamento no que performa e refinar público. É a janela de correção antes da Live — depois dela não há tempo de ajustar.' },
    { periodo: '21/Out, 19h',    fase: 'LIVE',       cor: 'brand',  acao: 'Live de ofertas',            detalhe: 'Aviso massivo para a base de leads. Revelação das condições Santander e G30 Pay. Fluxo total para o atendimento por IA.' },
    { periodo: '22 a 24/Out',    fase: 'Feirão',     cor: 'red',    acao: 'Urgência real',              detalhe: 'Pausar campanhas frias. Orçamento em remarketing com veículos sendo entregues. Gatilho: últimas unidades.' }
  ]
};

/* ---------------------------------------------------------------------
   Os seis criativos — PDF "Plano de Criativos", Thairone Dantas.
   Vídeos: execução real de duas lojas.
     moto  → Suzuki Moto Marques
     carro → Goiânia Veículos (não entregou o criativo 06)
   --------------------------------------------------------------------- */
const CRIATIVOS = [
  {
    n: '01', angulo: 'Curiosidade', titulo: 'Você não está preparado',
    premissa: 'Abrir com uma frase que pareça segredo e revelar o feirão aos poucos.',
    roteiro: [
      ['0–2s',   '“Você não está preparado para o que vai acontecer…”'],
      ['2–6s',   'Cortes rápidos: chave, porta abrindo, painel, veículos entrando em cena.'],
      ['6–11s',  '“Vem aí o Mega Feirão G30. Veículos, condições especiais e oportunidades reais.”'],
      ['11–16s', 'Mostrar os veículos mais desejados e o movimento do feirão.'],
      ['16–18s', '“Salva a data e vem.”']
    ],
    videos: { moto: 'criativo-01-voce-nao-esta-preparado', carro: 'loja-01-voce-nao-esta-preparado' }
  },
  {
    n: '02', angulo: 'Recomendação', titulo: 'Se eu fosse você',
    premissa: 'Vendedor olhando para a câmera. Linguagem de amigo, sem cara de anúncio.',
    roteiro: [
      ['0–3s',   '“Se eu estivesse procurando um veículo hoje, eu faria uma coisa…”'],
      ['3–7s',   '“Eu esperaria o Mega Feirão G30.”'],
      ['7–12s',  'Mostrar 3 a 5 veículos diferentes e detalhes de acabamento.'],
      ['12–16s', '“Você compara, escolhe, negocia e pode sair de veículo novo.”'],
      ['16–18s', '“Quer ver as oportunidades? Chama a gente agora.”']
    ],
    videos: { moto: 'criativo-02-se-eu-fosse-voce', carro: 'loja-02-se-eu-fosse-voce' }
  },
  {
    n: '03', angulo: 'Preço e jogo', titulo: 'Preço que faz parar',
    premissa: 'Transformar o preço em brincadeira para aumentar a retenção.',
    roteiro: [
      ['0–2s',   '“Quanto você acha que custa esse veículo?”'],
      ['2–7s',   'Mostrar exterior, interior, painel, multimídia e detalhes.'],
      ['7–10s',  'Exibir três preços na tela e pedir para escolher.'],
      ['10–14s', 'Revelar a condição real do veículo.'],
      ['14–18s', '“E essa é só uma das oportunidades do Mega Feirão G30.”']
    ],
    videos: { moto: 'criativo-03-preco-que-faz-parar', carro: 'loja-03-preco-que-faz-parar' }
  },
  {
    n: '04', angulo: 'Dor e desejo', titulo: 'Você está perdendo dinheiro',
    premissa: 'Falar com quem quer trocar de veículo, mas continua adiando.',
    roteiro: [
      ['0–3s',   '“Talvez você esteja adiando a troca do seu veículo pelo motivo errado.”'],
      ['3–7s',   'Mostrar a pessoa pesquisando no celular e depois os veículos do feirão.'],
      ['7–12s',  '“No feirão você encontra várias opções no mesmo lugar.”'],
      ['12–16s', 'Mostrar avaliação do usado, negociação e entrega.'],
      ['16–18s', '“Talvez o veículo que você procura esteja aqui.”']
    ],
    videos: { moto: 'criativo-04-perdendo-dinheiro', carro: 'loja-04-perdendo-dinheiro' }
  },
  {
    n: '05', angulo: 'Interação', titulo: 'Desafio do preço',
    premissa: 'Fazer a pessoa participar mentalmente antes de chegar ao evento.',
    roteiro: [
      ['0–2s',   '“Tenho um desafio para você.”'],
      ['2–6s',   'Mostrar um veículo sem preço. “Quanto você pagaria?”'],
      ['6–10s',  'Detalhes do veículo e três opções de preço.'],
      ['10–14s', 'Revelar a oportunidade e cortar para outro veículo.'],
      ['14–18s', '“Agora imagina quantas oportunidades você vai encontrar no feirão.”']
    ],
    videos: { moto: 'criativo-05-desafio-do-preco', carro: 'loja-05-desafio-do-preco' }
  },
  {
    n: '06', angulo: 'Urgência', titulo: 'Última chance',
    premissa: 'Criativo para a reta final. Contagem regressiva e sensação de movimento.',
    roteiro: [
      ['0–2s',   '“Faltam poucos dias.” Com contagem regressiva.'],
      ['2–6s',   'Montagem acelerada dos melhores veículos.'],
      ['6–11s',  '“O estoque está pronto. A equipe está pronta. E você?”'],
      ['11–15s', 'Mostrar a preparação do espaço e os veículos sendo posicionados.'],
      ['15–18s', '“Mega Feirão G30. Vem.”']
    ],
    videos: { moto: 'criativo-06-ultima-chance', carro: 'loja-06-ultima-chance' }
  }
];

/* ---------------------------------------------------------------------
   Criativos prontos, para a loja baixar e publicar como seus.
   Gravados pelo Misael sem citar nome de loja nenhum, justamente para
   servirem a qualquer uma — inclusive às que não produzem vídeo.
   Ficam em 1080x1920, a resolução que o Instagram usa: aqui o arquivo é
   publicado de novo pela loja, e não só assistido nesta página.
   --------------------------------------------------------------------- */
const PRONTOS = [
  {
    slug: 'mega-feirao-g30-motos', titulo: 'Convite — motos', duracao: '29s',
    resumo: 'Apresentador numa loja de motos, com as datas do Feirão na tela. Sem nome de loja, sem oferta específica.',
    usar: 'Publique como está e ponha o endereço e o contato da sua loja na legenda ou no story.'
  },
  {
    slug: 'mega-feirao-g30-carros', titulo: 'Convite — carros', duracao: '38s',
    resumo: 'Mesmo formato, em loja de carros, falando de taxa e condição. Também sem identificar a loja.',
    usar: 'Vale para o feed e para o story. Se for ao story, lembre de marcar o perfil da loja.'
  }
];

const LOJAS = { moto: 'Suzuki Moto Marques', carro: 'Goiânia Veículos' };

const RETENCAO = [
  'Gancho nos dois primeiros segundos.',
  'Cortes a cada 1 ou 2 segundos.',
  'Mostrar pessoas, movimento e bastidores.',
  'Textos curtos e objetivos na tela.',
  'Sempre finalizar com um CTA claro.'
];

const GIDEAO = [
  { grupo: 'Marketing e tráfego', prompts: [
    'Analisa minha campanha de tráfego.', 'Qual campanha ativa está com melhor custo por lead?',
    'Esse anúncio está bom?', 'Me dê ideias de criativos para Corolla.', 'Crie uma copy para Instagram.',
    'Como gerar mais leads qualificados?', 'Me sugira campanhas para giro rápido.', 'Como melhorar meu CPL?',
    'Quais tendências de marketing funcionam para seminovos?' ] },
  { grupo: 'Compra de veículos', prompts: [
    'Quais veículos têm maior giro hoje?', 'Quero comprar um Compass 2020 na Auto Avaliar.',
    'Me mostra oportunidades de compra na Auto Avaliar.', 'Esse veículo está bem precificado?',
    'Quais SUVs estão em alta na Auto Avaliar?' ] },
  { grupo: 'Financeiro da loja', prompts: [
    'Lançar gasto de martelinho no Civic.', 'Quanto minha loja gastou hoje?', 'Organize minhas despesas.',
    'Qual categoria estou gastando mais?', 'Quanto investi em tráfego?', 'Me ajude a controlar o caixa.',
    'Esse gasto está alto para uma loja do meu porte?' ] },
  { grupo: 'Inteligência para o dono', destaque: 'Aqui mora o ouro', prompts: [
    'Como vender mais esse mês?', 'O que lojas lucrativas fazem diferente?', 'Me dê uma estratégia para giro rápido.',
    'Como melhorar meu atendimento?', 'Me ajude a montar uma campanha.', 'Como aumentar ticket médio?',
    'Crie uma estratégia de pós-venda.', 'Como reduzir estoque parado?',
    'Quais tendências do mercado automotivo devo acompanhar?' ] }
];

const OBJECOES = [
  { tag: 'Taxa', pergunta: 'A taxa de juros está muito alta.',
    resposta: 'Compreendo perfeitamente, [Nome]. E é exatamente por isso que estou a ligar hoje. Neste Feirão o Santander subsidiou as nossas taxas e a loja vai isentar a mensalidade da G30 Pay. No final das contas a sua parcela fica muito mais baixa do que o normal. Posso rodar uma simulação rápida, sem compromisso, só para você ver o valor exato?' },
  { tag: 'Tempo', pergunta: 'Vou pensar e depois falo com você.',
    resposta: '[Nome], tem todo o direito de pensar, é uma decisão importante. Mas as condições do Santander com taxa subsidiada encerram no sábado e o stock está a voar. Pensar faz sentido se for para avaliar a parcela exata na sua realidade. O que acha de fazermos a pré-aprovação agora? Assim você pensa com os números reais na mão e a vaga garantida.' },
  { tag: 'Retoma', pergunta: 'Pagaram pouco no meu veículo na troca.',
    resposta: '[Nome], a avaliação na rua realmente está muito abaixo. Mas no Mega Feirão G30 temos o aval para valorizar a retoma como incentivo de compra, especialmente porque a entrada pode ser parcelada em 24x pela G30 Pay, libertando margem para pagar melhor pelo seu veículo. Traga o veículo até aqui, deixe o meu avaliador ver pessoalmente e garanto que chegamos ao número que você precisa.' }
];

const MENSAGENS = [
  { n: 1,  titulo: 'Clareza direta',        texto: '[nome do cliente], me ajuda aqui, tô organizando meus atendimentos. Você ainda tá avaliando comprar seu (carro/moto) ou já resolveu?' },
  { n: 2,  titulo: 'Prioridade',            texto: '[nome do cliente], ainda é prioridade pra você comprar seu (carro/moto) agora ou ficou pra mais pra frente?' },
  { n: 3,  titulo: 'Ativa a dor',           texto: '[nome do cliente], me ajuda aqui, você ainda vai comprar seu (carro/moto)? Pergunto porque muita gente adia e continua com o mesmo problema. Ainda tá te incomodando?' },
  { n: 4,  titulo: 'Emocional e futuro',    texto: '[nome do cliente], se você resolver aquele ponto que te incomoda no (carro/moto), isso melhora seu dia a dia hoje?' },
  { n: 5,  titulo: 'Posicionamento',        texto: '[nome do cliente], você prefere comprar seu (carro/moto) agora ou deixar pra quando ficar mais urgente?' },
  { n: 6,  titulo: 'Quebra de padrão',      texto: '[nome do cliente], posso ser direto contigo pra respeitar teu tempo? Você ainda tá no jogo pra comprar seu (carro/moto)?' },
  { n: 7,  titulo: 'Sem pressão',           texto: '[nome do cliente], não quero te incomodar. Só entender se faz sentido eu seguir te ajudando na compra do seu (carro/moto).' },
  { n: 8,  titulo: 'Decisão com condição',  texto: '[nome do cliente], se aparecer uma condição que encaixe no seu orçamento, você avançaria agora?' },
  { n: 9,  titulo: 'Autoridade',            texto: '[nome do cliente], hoje depende só de você ou precisa alinhar com alguém pra bater o martelo?' },
  { n: 10, titulo: 'Final definitivo',      texto: '[nome do cliente], vou encerrar seu atendimento por aqui pra não te incomodar. Se fizer sentido retomar, me chama que será uma honra te ajudar na realização do sonho da compra do seu (carro/moto).' }
];

/* ---------------------------------------------------------------------
   Cases das edições passadas — vídeos enviados pelas lojas participantes.
   Já vinham em H.264; foram só remuxados com faststart.
   --------------------------------------------------------------------- */
const CASES = [
  { slug: 'case-01-depoimento-lojista', titulo: 'O depoimento de quem viveu',
    formato: 'vertical', duracao: '1min48',
    resumo: 'Lojista conta, sem roteiro e sem produção, como foi a operação durante os três dias.',
    olhar: 'Repare que o valor está na sinceridade, não na edição. Um celular e uma camiseta do Feirão bastam.' },

  { slug: 'case-02-atendimento-congestionado', titulo: 'Atendimento congestionado',
    formato: 'vertical', duracao: '57s',
    resumo: 'Bastidores da sala de atendimento no pico, com o painel de leads aberto na tela.',
    olhar: 'Mostrar o volume real de leads é prova social mais forte do que qualquer promessa. Prepare a equipe para o congestionamento.' },

  { slug: 'case-03-patio-cheio', titulo: 'O pátio cheio',
    formato: 'vertical', duracao: '2min07',
    resumo: 'Caminhada pelo pátio lotado de clientes, no meio do movimento.',
    olhar: 'Movimento de gente vende mais que foto de veículo parado. Grave caminhando, sem cortes, no horário de pico.' },

  { slug: 'case-04-meta-batida', titulo: 'Meta e super meta batidas',
    formato: 'vertical', duracao: '18s',
    resumo: 'A comemoração da equipe na porta da loja quando o resultado fecha.',
    olhar: 'Curto, noturno e com a equipe junta. É o conteúdo de encerramento que alimenta a próxima edição.' },

  { slug: 'case-05-entrega', titulo: 'A entrega',
    formato: 'horizontal', duracao: '1min21',
    resumo: 'Cliente recebendo o veículo com laço, dentro da loja.',
    olhar: 'A entrega é o melhor gatilho de remarketing na reta final. Combine a gravação com o cliente antes.' },

  { slug: 'case-06-compilado-lojas', titulo: 'Compilado das lojas',
    formato: 'vertical', duracao: '2min24',
    resumo: 'Várias lojas do Feirão passado, entre carros, motos, reuniões e ações de pátio.',
    olhar: 'Serve como banco de ideias: cada trecho é um formato que você pode reproduzir na sua loja.' }
];

const ABAS = [
  { id: 'main',       nome: 'O Feirão' },
  { id: 'criativos',  nome: 'Criativos' },
  { id: 'cases',      nome: 'Cases' },
  { id: 'calendario', nome: 'Calendário' },
  { id: 'trafego',    nome: 'Tráfego' },
  { id: 'execucao',   nome: 'Execução' },
  { id: 'presales',   nome: 'Pré-vendas' }
];
