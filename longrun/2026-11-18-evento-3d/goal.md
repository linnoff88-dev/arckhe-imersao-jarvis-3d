# Goal — evento-3d

- **Início:** 2026-11-18 01:03 · **Agente:** `codex exec` com gpt-6.2-astra, esforço medium, orquestrado pelo Claude Code
- **Tetos:** 45 min e 8 GB por rodada · até 6 rodadas · parar se a cota estimada somar 25%

## Resultado
Evento 3D "Imersão Jarvis" rodando localmente, com modo sem 3D e página mostrando todo o processo.

## Critérios de pronto (verificáveis)

**Função**
- [ ] `python3 tools/validar_conteudo.py` → `OK: 6 palcos, 8 peças`
- [ ] Navegador real em `http://localhost:8791/` → entra no hangar com WebGL, sem erro no console
- [ ] Navegador: marcar os 6 palcos como feitos → 8 peças no robô e fecho visível
- [ ] Navegador em 360 px, modo sem 3D → 6 etapas e `scrollWidth` igual à largura da tela
- [ ] `processo/index.html` no navegador → todas as rodadas de `processo/dados.json`, com prompt, tempo, tokens e custo

**Regressão**
- [ ] `node --check` em cada `src/*.js` → sem erro
- [ ] Recarregar a página depois de marcar uma etapa → progresso mantido

**Limite**
- [ ] `git diff --stat <commit-base> -- fonte marca vendor tools processo/BRIEFING.md` → vazio
- [ ] `grep -RInE "api[_-]?key|OPENAI_API|setInterval\(.*online" index.html src conteudo` → vazio

**Teste rápido por ciclo:** `python3 tools/validar_conteudo.py`
**Teste completo no final:** roteiro de navegador em `processo/revisoes/`

## Restrições
- só pela assinatura (sem API)
- não mexer em: `~/.codex/config.toml`, `~/.config/inema/modelos.env`, portal, inemaeventos

## Portões humanos (parar e perguntar)
- criar repositório no GitHub, push ou publicação
- gerar avatar no HeyGen
- cota acima do teto
