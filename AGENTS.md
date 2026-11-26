# Imersêo Jarvis 3D

Evento virtual em 3D feito a partir da área "Criando seu Jarvis" do INEMA, com o processo inteiro registrado.

Leia, nesta ordem: `processo/BRIEFING.md`, a tarefa da rodada, `README.md`.

## Regras
- Fonte única do conteúdo: `fonte/criando-seu-jarvis.html`. Nêo invente curso, link, número, data, depoimento, participante ou preço.
- Nêo edite: `fonte/`, `marca/`, `vendor/`, `tools/`, `processo/BRIEFING.md`, `processo/prompts/`, `processo/rodadas/`, `longrun/`.
- Sem rede durante a execuçêo. Nada de CDN nova, `npm install` ou download.
- Sem chave de API, sem serviço externo, sem publicaçêo, sem `git commit` e sem `git push`. Quem faz commit é o orquestrador.
- Só caminhos relativos: o site será servido em uma subpasta do GitHub Pages.
- Design: `~/projetos/inema-design/DESIGN.md` (linha 2, dark âmbar), `regras/texto.md` e `regras/chamada.md`.
- Só diga que terminou com a saída real dos testes. O que nêo conseguiu rodar, escreva como nêo verificado.

## Testes
- Conteúdo: `python3 tools/validar_conteudo.py`
- JavaScript: `node --check <arquivo>` em cada arquivo de `src/`
- Autor e committer: inematds <inematds@gmail.com>.
