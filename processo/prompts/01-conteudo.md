Rodada 1: programação do evento. Não crie o site ainda.

Leia `AGENTS.md`, `processo/BRIEFING.md`, `fonte/criando-seu-jarvis.html`, `~/projetos/inema-design/regras/texto.md` e `~/projetos/inema-design/regras/chamada.md`.

Crie `conteudo/evento.json` (UTF-8) com exatamente estas chaves no topo:
- `titulo`, `subtitulo`
- `chamada`: `dor_ou_desejo`, `quem`, `nucleo`, `por_que_importa`, `metodo`, `formato` (copie os valores do briefing)
- `apresentador`: `nome` ("Nei Maldaner"), `video` (null), `abertura`, `encerramento` (falas curtas, em primeira pessoa, sem ano em algarismo)
- `pecas`: as 8 peças da fonte, cada uma com `id`, `nome` (igual à fonte), `descricao` e `parte_robo`
- `palcos`: as 6 etapas, na ordem, cada uma com:
  `id`, `numero`, `titulo` (igual à fonte, sem o número), `ganho`, `pecas` (ids; toda peça aparece em exatamente um palco), `materiais` (lista com `tipo`, `titulo`, `url` e `detalhe`), `video` (`titulo`, `duracao`, `url`, `youtube_id`, ou null), `fala` (o que o apresentador diz ao chegar), `tarefa`, `pronto_quando`
- `portas`: as 3 portas de entrada da fonte, com `titulo`, `curso`, `url`, `para_quem`
- `alem`: os caminhos de "Para ir além", com `titulo`, `descricao`, `url`
- `fecho`: `pergunta` (pergunta de verdade, ligada ao desejo) e `cta` (contém "grátis no inema.club, direto na internet")

Regras:
- Todo `url` precisa existir literalmente na fonte. Vídeo só quando a fonte tiver um que combine com a etapa. Se não houver, use null.
- `tarefa` e `pronto_quando` saem do que a fonte promete para a etapa. Não prometa o que a fonte não diz.
- Respeite `regras/texto.md`: frases curtas, "você", sem as palavras proibidas.

Crie também `conteudo/roteiro.md`: a ordem do evento, a fala de cada palco e, para cada palco, de qual trecho da fonte saiu o conteúdo.

Rode `python3 tools/validar_conteudo.py` até passar. Na resposta final, cole a última saída do validador e liste o que ficou sem vídeo.
