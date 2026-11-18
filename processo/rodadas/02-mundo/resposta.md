Implementei o hangar com seis palcos e o modo sem 3D. Os dois usam a mesma agenda, o mesmo crachá e o mesmo progresso. Corrigi os links, o sensor do ombro, os requisitos de placa de vídeo e a fala final no JSON. Também sincronizei o roteiro com o novo sensor e o encerramento.

**Arquivos**

- Entrada e apresentação visual — [index.html](/home/nmaldaner/projetos/imersao-jarvis-3d/index.html) e [estilo.css](/home/nmaldaner/projetos/imersao-jarvis-3d/src/estilo.css)
- Hangar, robô e navegação — [mundo.js](/home/nmaldaner/projetos/imersao-jarvis-3d/src/mundo.js), [robo.js](/home/nmaldaner/projetos/imersao-jarvis-3d/src/robo.js) e [controles.js](/home/nmaldaner/projetos/imersao-jarvis-3d/src/controles.js)
- Sessões, dados e progresso — [interface.js](/home/nmaldaner/projetos/imersao-jarvis-3d/src/interface.js), [dados.js](/home/nmaldaner/projetos/imersao-jarvis-3d/src/dados.js) e [progresso.js](/home/nmaldaner/projetos/imersao-jarvis-3d/src/progresso.js)
- Conteúdo — [evento.json](/home/nmaldaner/projetos/imersao-jarvis-3d/conteudo/evento.json) e [roteiro.md](/home/nmaldaner/projetos/imersao-jarvis-3d/conteudo/roteiro.md)

**Saídas reais das verificações**

```text
OK: 6 palcos, 8 peças, 19 links conferidos com a fonte
OK  src/controles.js
OK  src/dados.js
OK  src/interface.js
OK  src/mundo.js
OK  src/progresso.js
OK  src/robo.js
OK: DOM simulado — crachá, 6 sessões, vídeo sob clique, 8 peças e fecho
OK: persistência, limpeza e progresso sem localStorage
OK: Three.js — 8 encaixes e linha final do visor na geometria
```

Cada linha de arquivo JS foi impressa depois que `node --check` retornou com código zero.

**não verificado no navegador**. A área isolada bloqueou a abertura do socket do servidor HTTP e a inicialização do Chromium headless.

```text
PermissionError: [Errno 1] Operation not permitted
[1118/011151.315026:FATAL:content/browser/sandbox_host_linux.cc:41] Check failed: . shutdown: Operation not permitted (1)
```

Ficaram sem confirmação em navegador real a renderização WebGL e sua queda automática para o modo sem 3D, a legibilidade dos telões a seis metros, o movimento e as colisões, o controle por toque e o layout em 360 px.