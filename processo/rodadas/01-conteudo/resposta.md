Criei a [programação do evento](conteudo/evento.json) e o [roteiro](conteudo/roteiro.md), com as falas dos seis palcos e os trechos da fonte usados em cada etapa.

**Ficaram sem vídeo** o palco 4, “Dê voz a ele”, e o palco 6, “Faça ele melhorar toda semana”. A fonte indica o guia do `jarvis-local` e o curso IA Cultivada, respectivamente. A abertura e o encerramento de Nei Maldaner também ficaram em texto, conforme o briefing.

**A validação oficial ficou pendente.** Conferi os 19 links diretamente no HTML. Todos aparecem literalmente na fonte. O validador só reconhece endereços absolutos, enquanto a fonte usa caminhos relativos nos três cartões de “Para ir além”. Preservei esses caminhos.

Última saída de `python3 tools/validar_conteudo.py`:

```text
ERRO: url fora da fonte: /jarvis/
ERRO: url fora da fonte: /do-chat-ao-agente/
ERRO: url fora da fonte: /imersao-do-chat-ao-agente/
REPROVADO: 3 erro(s)
```