Rodada 2: construa o evento.

Leia `AGENTS.md`, `processo/BRIEFING.md`, `conteudo/evento.json`, `~/projetos/inema-design/DESIGN.md` (seções 1 e 2) e `~/projetos/inema-design/regras/texto.md`. O briefing é o contrato: cumpra os 11 itens de "O que precisa existir" e todo o "Não pode".

Antes de construir, corrija `conteudo/evento.json`:
- Em `alem`, troque os 3 caminhos relativos pelo endereço completo, começando com `https://eventos.inema.pro/`. O evento ficará em outro site.
- A peça `testes` não pode ser o visor, porque o robô tem visor preto desde o início. Use `parte_robo`: "Sensor de conferência no ombro".
- Nos palcos 4 e 5, deixe claro no `detalhe` do guia que a etapa pede um computador com placa de vídeo, como a fonte diz.
- Reescreva `apresentador.encerramento`: uma fala curta que retoma o assistente montado e leva à pergunta do fecho.

Crie:
- `index.html`: entrada, hangar, agenda, painel da sessão, crachá e modo sem 3D.
- `src/estilo.css`: tokens em `:root`, sem cor solta fora deles.
- `src/dados.js`: carrega `conteudo/evento.json` e mostra erro legível se falhar.
- `src/progresso.js`: nome e etapas feitas, com `localStorage` em `try/catch`.
- `src/mundo.js`: cena Three.js, importada de `../vendor/three/three.module.js`.
- `src/robo.js`: robô e encaixe das 8 peças.
- `src/controles.js`: teclado, mouse, clique para ir e toque.
- `src/interface.js`: painéis, agenda, vídeo sob clique, modo sem 3D e fecho.

Direção de arte:
- Hangar industrial escuro, piso de concreto polido, vigas, luz âmbar quente vinda de cima, 6 palcos em arco em volta do robô.
- Cada palco tem número grande, telão com o título da etapa e uma faixa de luz. O título no telão é desenhado em canvas com Sora ou fonte sem serifa e precisa ser legível a 6 metros.
- O robô tem proporção humana, cerca de 2,2 m, cabeça com visor preto largo, corpo em metal fosco cinza-claro. Peça ainda não feita aparece como estrutura escura vazia. Peça feita aparece completa, com uma luz breve de encaixe.
- Câmera na altura dos olhos, início olhando o robô. Movimento suave, velocidade de caminhada confortável.
- Ao marcar a última etapa, o visor ganha uma linha âmbar fina e o painel do fecho abre.

Exponha `window.__evento` só para teste, com: `estado()` devolvendo `{modo, palcoAtual, feitas, pecasVisiveis, webgl}`, `irPara(numero)`, `marcar(numero)` e `limpar()`.

Verificação obrigatória antes de responder:
1. `python3 tools/validar_conteudo.py`
2. `node --check` em cada arquivo de `src/`
3. Tente abrir por `python3 -m http.server` em um navegador headless. Se a área isolada bloquear, escreva "não verificado no navegador" e diga o bloqueio.

Na resposta final, liste os arquivos, cole as saídas reais e diga o que não conseguiu verificar.
