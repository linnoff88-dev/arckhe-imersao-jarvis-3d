# ImersÃ£o Jarvis 3D

VocÃª entra em um hangar, passa por 6 palcos e monta o seu Jarvis peÃ§a por peÃ§a. O evento nasce da Ã¡rea [Criando seu Jarvis](https://eventos.inema.pro/criando-seu-jarvis/) e foi construÃ­do pelo Codex com GPT-6.2 Astra em nÃ­vel mÃ©dio. Cada rodada fica registrada em `processo/`.

## O processo, do inÃ­cio ao fim

| Passo | O que acontece | Comando | Quem faz |
|---|---|---|---|
| 1 | Copiar a pÃ¡gina-fonte, os logos e o Three.js | `fonte/`, `marca/`, `vendor/` | ðŸ§  sessÃ£o com o Nei |
| 2 | Escrever briefing, regras e validador | `processo/BRIEFING.md`, `tools/validar_conteudo.py` | ðŸ§  sessÃ£o com o Nei |
| 3 | Criar a programaÃ§Ã£o | `tools/rodar_codex.sh processo/prompts/01-conteudo.md` | ðŸ¤– Codex Astra mÃ©dio |
| 4 | Conferir a programaÃ§Ã£o com a fonte | `python3 tools/validar_conteudo.py` | âš™ï¸ script |
| 5 | Construir o hangar 3D e o modo sem 3D | `tools/rodar_codex.sh processo/prompts/02-mundo.md` | ðŸ¤– Codex Astra mÃ©dio |
| 6 | Testar no navegador e listar correÃ§Ãµes | navegador + `processo/revisoes/` | ðŸ§  sessÃ£o com o Nei |
| 7 | Aplicar as correÃ§Ãµes | `tools/rodar_codex.sh processo/prompts/03-correcoes.md` | ðŸ¤– Codex Astra mÃ©dio |
| 8 | Dar acabamento ao robÃ´, Ã  luz e aos palcos | `tools/rodar_codex.sh processo/prompts/04-acabamento.md` | ðŸ¤– Codex Astra mÃ©dio |
| 8b | Corrigir o robÃ´ inicial e os enquadramentos | `tools/rodar_codex.sh processo/prompts/04b-ajustes.md` | ðŸ¤– Codex Astra mÃ©dio |
| 9 | Criar a pÃ¡gina "Como foi feito" | `tools/rodar_codex.sh processo/prompts/05-processo.md` | ðŸ¤– Codex Astra mÃ©dio |
| 9b | Tocar o vÃ­deo no telÃ£o do palco | `tools/rodar_codex.sh processo/prompts/06-video-no-telao.md` | ðŸ¤– Codex Astra mÃ©dio |
| 10 | ConferÃªncia final e aprovaÃ§Ã£o do Nei | `python3 -m http.server 8791` | ðŸ§  sessÃ£o com o Nei |

## Como abrir

```bash
python3 -m http.server 8791
```

Depois abra `http://localhost:8791/`.

Para abrir em outros aparelhos da rede, use o servidor que entrega sÃ³ os arquivos pÃºblicos:

```bash
python3 tools/servir.py <ip-da-maquina> 8791
```

## Custo

`tools/resumir_rodada.py` grava tempo, tokens e custo equivalente de cada rodada em `processo/dados.json`. O uso real Ã© pela assinatura do Codex, sem chave de API.

---

Projeto adaptado da comunidade INEMA TDS - Marca Arckhe