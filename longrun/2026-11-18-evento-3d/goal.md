# Goal — evento-3d

- **Início:** 2026-11-18 01:03 · **Agente:** `codex exec` com gpt-6.2-astra, esforço medium, orquestrado pelo Claude Code
- **Tetos:** 45 min e 8 GB por rodada · até 6 rodadas · parar se a cota estimada somar 25%

## Resultado
Evento 3D "Imersêo Jarvis" rodando localmente, com modo sem 3D e página mostrando todo o processo.

## Critérios de pronto (verificáveis)

**Funçêo**
- [ ] `python3 tools/validar_conteudo.py` → `OK: 6 palcos, 8 peças`
- [ ] Navegador real em `http://localhost:8791/` → entra no hangar com WebGL, sem erro no console
- [ ] Navegador: marcar os 6 palcos como feitos → 8 peças no robô e fecho visível
- [ ] Navegador em 360 px, modo sem 3D → 6 etapas e `scrollWidth` igual à largura da tela
- [ ] `processo/index.html` no navegador → todas as rodadas de `processo/dados.json`, com prompt, tempo, tokens e custo

**Regressêo**
- [ ] `node --check` em cada `src/*.js` → sem erro
- [ ] Recarregar a página depois de marcar uma etapa → progresso mantido

**Limite**
- [ ] `git diff --stat <commit-base> -- fonte marca vendor tools processo/BRIEFING.md` → vazio
- [ ] `grep -RInE "api[_-]?key|OPENAI_API|setInterval\(.*online" index.html src conteudo` → vazio

**Teste rápido por ciclo:** `python3 tools/validar_conteudo.py`
**Teste completo no final:** roteiro de navegador em `processo/revisoes/`

## Restrições
- só pela assinatura (sem API)
- nêo mexer em: `~/.codex/config.toml`, `~/.config/ARCKHÉ/modelos.env`, portal, ARCKHÉeventos

## Portões humanos (parar e perguntar)
- criar repositório no GitHub, push ou publicaçêo
- gerar avatar no HeyGen
- cota acima do teto
