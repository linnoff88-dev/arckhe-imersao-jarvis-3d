ï»¿# ImersêÂ£o Jarvis 3D

VocêÂª entra em um hangar, passa por 6 palcos e monta o seu Jarvis peêÂ§a por peêÂ§a. O evento nasce da êÂ¡rea [Criando seu Jarvis](https://eventos.inema.pro/criando-seu-jarvis/) e foi construêÂ­do pelo Codex com GPT-6.2 Astra em nêÂ­vel mêÂ©dio. Cada rodada fica registrada em `processo/`.

## O processo, do inêÂ­cio ao fim

| Passo | O que acontece | Comando | Quem faz |
|---|---|---|---|
| 1 | Copiar a pêÂ¡gina-fonte, os logos e o Three.js | `fonte/`, `marca/`, `vendor/` | ê°Å¸Â§Â  sessêÂ£o com o Nei |
| 2 | Escrever briefing, regras e validador | `processo/BRIEFING.md`, `tools/validar_conteudo.py` | ê°Å¸Â§Â  sessêÂ£o com o Nei |
| 3 | Criar a programaêÂ§êÂ£o | `tools/rodar_codex.sh processo/prompts/01-conteudo.md` | ê°Å¸Â¤â Codex Astra mêÂ©dio |
| 4 | Conferir a programaêÂ§êÂ£o com a fonte | `python3 tools/validar_conteudo.py` | ê¢Å¡â¢ê¯Â¸Â script |
| 5 | Construir o hangar 3D e o modo sem 3D | `tools/rodar_codex.sh processo/prompts/02-mundo.md` | ê°Å¸Â¤â Codex Astra mêÂ©dio |
| 6 | Testar no navegador e listar correêÂ§êÂµes | navegador + `processo/revisoes/` | ê°Å¸Â§Â  sessêÂ£o com o Nei |
| 7 | Aplicar as correêÂ§êÂµes | `tools/rodar_codex.sh processo/prompts/03-correcoes.md` | ê°Å¸Â¤â Codex Astra mêÂ©dio |
| 8 | Dar acabamento ao robêÂ´, êÂ  luz e aos palcos | `tools/rodar_codex.sh processo/prompts/04-acabamento.md` | ê°Å¸Â¤â Codex Astra mêÂ©dio |
| 8b | Corrigir o robêÂ´ inicial e os enquadramentos | `tools/rodar_codex.sh processo/prompts/04b-ajustes.md` | ê°Å¸Â¤â Codex Astra mêÂ©dio |
| 9 | Criar a pêÂ¡gina "Como foi feito" | `tools/rodar_codex.sh processo/prompts/05-processo.md` | ê°Å¸Â¤â Codex Astra mêÂ©dio |
| 9b | Tocar o vêÂ­deo no telêÂ£o do palco | `tools/rodar_codex.sh processo/prompts/06-video-no-telao.md` | ê°Å¸Â¤â Codex Astra mêÂ©dio |
| 10 | ConferêÂªncia final e aprovaêÂ§êÂ£o do Nei | `python3 -m http.server 8791` | ê°Å¸Â§Â  sessêÂ£o com o Nei |

## Como abrir

```bash
python3 -m http.server 8791
```

Depois abra `http://localhost:8791/`.

Para abrir em outros aparelhos da rede, use o servidor que entrega sêÂ³ os arquivos pêÂºblicos:

```bash
python3 tools/servir.py <ip-da-maquina> 8791
```

## Custo

`tools/resumir_rodada.py` grava tempo, tokens e custo equivalente de cada rodada em `processo/dados.json`. O uso real êÂ© pela assinatura do Codex, sem chave de API.

---

Projeto  - ARCKHÉe