Rodada 6b: corrija só o tamanho do player no telêo. Leia `AGENTS.md`, `processo/revisoes/revisao-r6.md` e o código do vídeo no telêo.

O contêiner do player deve ter exatamente a posiçêo e o tamanho da área do telêo, com `overflow: hidden` e fundo preto. Dentro dele, o iframe fica centralizado e cabe inteiro, sem cortar o vídeo:
- vídeo normal: proporçêo 16:9, com a maior largura ou altura que couber;
- YouTube Shorts (`/shorts/` na URL): proporçêo 9:16, altura igual à do telêo e largura proporcional.

Remova qualquer `aspect-ratio`, `height: auto` ou regra que faça o iframe passar do telêo. O botêo "Parar vídeo" continua visível dentro da área do telêo.

`estado().videoTelao.player` passa a informar o retângulo real do iframe, que deve caber em `telao` em desktop e celular.

Verifique com `python3 tools/validar_conteudo.py`, `node --check` em cada arquivo JS e seus testes locais. Cole as saídas reais.
