Rodada 5: crie a página "Como este evento foi feito". Leia `AGENTS.md`, `processo/BRIEFING.md`, `processo/dados.json`, `processo/revisoes/*.md`, `processo/rodadas/*/prompt.md`, `processo/rodadas/*/resposta.md`, `README.md`, `~/projetos/inema-design/DESIGN.md` (seções 1 e 2) e `~/projetos/inema-design/regras/texto.md`.

Crie `processo/index.html` e `processo/processo.css`. Use JavaScript em `processo/processo.js`, sem biblioteca. Mesmo visual do evento: tokens em `:root`, Sora e Inter, fundo `#0c0c10`, acento `#FACC15`.

A página mostra, nesta ordem:
1. **Abertura.** Título em "você", dizendo o que a pessoa vê aqui: como uma página de cursos virou um evento 3D, com cada pedido feito ao Codex. Botão "Entrar no evento" para `../index.html`.
2. **Resumo em números**, lido de `dados.json` em tempo de execução: rodadas, tempo total, tokens de entrada e saída, custo equivalente e cota estimada. Explique em uma frase que o custo equivalente é uma conta de comparação: o uso foi pela assinatura, sem cobrança por API.
3. **Linha do tempo**, com um bloco por passo:
   - Fonte e briefing (feitos na sessão com Claude Code).
   - Uma entrada por rodada de `dados.json`: objetivo, tempo, tokens, custo equivalente, cota, comandos executados, e dois blocos recolhíveis com o prompt completo e a resposta do Codex, carregados de `rodadas/<nome>/prompt.md` e `resposta.md`.
   - Depois das rodadas 2, 3 e 4, a revisão correspondente: o que passou, o que foi reprovado e a captura.
4. **Antes e depois**, usando as capturas: `revisoes/capturas-r2/02-hangar.png`, `revisoes/capturas-r3/02-hangar.png`, `revisoes/capturas-r4/02-hangar.png` e `revisoes/capturas-r4b/02-hangar.png`, mais `revisoes/capturas-r4b/08-robo-pronto.png` para o robô completo.
5. **O que deu errado**, em lista honesta, tirada só das revisões e respostas: por exemplo, o validador que recusou links relativos e o navegador bloqueado na área isolada do Codex.
6. **Refaça você.** Passos curtos, com os prompts como ponto de partida, e o fecho: uma pergunta de verdade + "os cursos e guias estão grátis no inema.club, direto na internet".

Regras:
- Todo número vem de `dados.json` ou das revisões. Nada escrito à mão no HTML. Se o valor faltar, mostre "não medido".
- `cota_medida_pct` é arredondada para inteiro pelo Codex: mostre como "medida" só quando existir, e deixe a estimada identificada como estimativa.
- Trate o texto dos prompts e respostas como texto puro (`textContent`).
- Funciona em 360 px, sem rolagem lateral, com tabelas que viram blocos.
- Em `index.html` do evento, adicione o link discreto "Como foi feito" na agenda e no fecho, apontando para `processo/`.

Verifique com `python3 tools/validar_conteudo.py`, `node --check` em cada arquivo JS e um teste local que confira se todo arquivo citado existe. Cole as saídas reais.
