'use strict';

const objetivos = {
  '01-conteudo': 'Transformar os cursos em uma programação',
  '02-mundo': 'Construir o hangar e a agenda sem 3D',
  '03-correcoes': 'Ocupar a tela e deixar o encaixe à vista',
  '04-acabamento': 'Dar forma ao robô e iluminar os palcos',
  '04b-ajustes': 'Mostrar a montagem desde a estrutura vazia',
  '05-processo': 'Documentar os pedidos e as revisões'
};

const revisoes = {
  '02-mundo': ['r2', 'O hangar ainda ocupava uma caixa dentro da página.'],
  '03-correcoes': ['r3', 'A cena passou a ocupar a janela inteira, mas perdeu a luz âmbar.'],
  '04-acabamento': ['r4', 'A luz quente voltou. O robô já parecia completo na entrada.'],
  '04b-ajustes': ['r4b', 'A estrutura escura aguarda as peças da armadura.']
};

function elemento(tag, texto) {
  const no = document.createElement(tag);
  if (texto !== undefined) no.textContent = texto;
  return no;
}

const decimal = new Intl.NumberFormat('pt-BR');
const dolar = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'USD'});
const ausente = 'não medido';
function valor(n, formato = x => decimal.format(x)) {
  return Number.isFinite(n) ? formato(n) : ausente;
}
const tempo = n => Math.floor(n / 60) + ' min ' + (n % 60) + ' s';
const pct = n => decimal.format(n) + '%';

function metrica(lista, nome, medida) {
  const grupo = elemento('div');
  grupo.append(elemento('dt', nome), elemento('dd', medida));
  lista.append(grupo);
}

function consumo(lista, segundos, entrada, saida, custo, cota) {
  metrica(lista, 'Tempo', valor(segundos, tempo));
  metrica(lista, 'Tokens de entrada', valor(entrada));
  metrica(lista, 'Tokens de saída', valor(saida));
  metrica(lista, 'Custo equivalente', valor(custo, x => dolar.format(x)));
  metrica(lista, 'Cota estimada', valor(cota, pct));
}

async function ler(caminho) {
  const resposta = await fetch(caminho);
  if (!resposta.ok) throw new Error(caminho);
  return resposta.text();
}

function documento(titulo, caminho) {
  const bloco = elemento('details');
  const texto = elemento('pre');
  bloco.append(elemento('summary', titulo), texto);
  let carregado = false;
  bloco.addEventListener('toggle', async () => {
    if (!bloco.open || carregado) return;
    carregado = true;
    texto.textContent = 'Carregando…';
    try {
      const original = await ler(caminho);
      texto.textContent = original.trim() ? original : 'O arquivo ainda está vazio.';
    } catch {
      texto.textContent = 'Falha ao carregar o arquivo. Feche e abra para tentar de novo.';
      carregado = false;
    }
  });
  return bloco;
}

function figura(caminho, legenda) {
  const fig = elemento('figure');
  const link = elemento('a');
  const img = elemento('img');
  img.src = caminho;
  img.alt = legenda;
  img.loading = 'lazy';
  link.href = caminho;
  link.append(img);
  fig.append(link, elemento('figcaption', legenda));
  return fig;
}

function hangar(id) {
  return 'revisoes/capturas-' + id + '/02-hangar.png';
}

async function revisao(pai, id, legenda) {
  const bloco = elemento('div');
  bloco.className = 'revisao';
  pai.append(bloco);
  const caminho = 'revisoes/revisao-' + id + '.md';
  const link = elemento('a', 'Ler a revisão original');
  link.href = caminho;
  bloco.append(elemento('h4', 'Revisão da rodada ' + id.slice(1)));
  try {
    const relato = await ler(caminho);
    let lista;
    for (const linha of relato.split(/\r?\n/)) {
      if (linha.startsWith('## ')) {
        lista = elemento('ul');
        bloco.append(elemento('strong', linha.slice(3)), lista);
      } else if (lista && /^(?:- |\d+\. )/.test(linha)) {
        lista.append(elemento('li', linha.replace(/^(?:- |\d+\. )/, '').replaceAll('`', '')));
      }
    }
  } catch {
    bloco.append(elemento('p', 'Falha ao carregar o texto da revisão.'));
  }
  bloco.append(figura(hangar(id), legenda), link);
}

function rodada(r) {
  const bloco = elemento('article');
  const numero = r.rodada.split('-')[0].replace(/^0/, '');
  bloco.append(elemento('h3', 'Rodada ' + numero + ' · ' + (objetivos[r.rodada] ?? r.rodada)));
  const lista = elemento('dl');
  lista.className = 'metricas';
  consumo(lista, r.segundos, r.tokens?.entrada, r.tokens?.saida, r.custo_equivalente_usd, r.cota_estimada_pct);
  const medida = r.cota_medida_pct;
  if (Number.isFinite(medida?.inicio) || Number.isFinite(medida?.fim)) {
    metrica(lista, 'Cota medida (início → fim)', valor(medida.inicio, pct) + ' → ' + valor(medida.fim, pct));
  }
  metrica(lista, 'Comandos executados', valor(r.itens?.command_execution));
  bloco.append(lista);
  if (medida) bloco.append(elemento('p', 'O Codex arredonda a leitura da cota para um percentual inteiro.'));
  const pasta = 'rodadas/' + r.rodada + '/';
  bloco.append(documento('Prompt completo', r.prompt ?? pasta + 'prompt.md'),
    documento('Resposta do Codex', r.resposta ?? pasta + 'resposta.md'));
  if (revisoes[r.rodada]) revisao(bloco, ...revisoes[r.rodada]);
  return bloco;
}

async function iniciar() {
  const galeria = document.querySelector('#galeria');
  for (const [id, legenda] of Object.values(revisoes)) {
    galeria.append(figura(hangar(id), 'Rodada ' + id.slice(1) + ' · ' + legenda));
  }
  galeria.append(figura('revisoes/capturas-r4b/08-robo-pronto.png', 'Robô completo após o encaixe da última peça.'));
  const status = document.querySelector('#status');
  try {
    const dados = JSON.parse(await ler('dados.json'));
    const total = dados.total ?? {};
    const resumo = document.querySelector('#resumo');
    metrica(resumo, 'Rodadas', valor(dados.rodadas?.length));
    consumo(resumo, total.segundos, total.tokens_entrada, total.tokens_saida, total.custo_equivalente_usd, total.cota_estimada_pct);
    for (const r of dados.rodadas ?? []) document.querySelector('#rodadas').append(rodada(r));
    status.hidden = true;
  } catch {
    status.textContent = 'Falha ao carregar os registros. Recarregue a página para tentar de novo.';
  }
}

iniciar();
