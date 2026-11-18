Criei a página [Como este evento foi feito](processo/index.html) e adicionei o link **Como foi feito** à agenda e ao fecho do evento.

A página carrega as métricas de `dados.json` e mostra cada pedido e resposta na íntegra. O registro atual contém cinco rodadas, até a 4b. A rodada 5 aparecerá quando o orquestrador acrescentá-la ao JSON.

**Saídas reais dos testes**

```text
OK: 6 palcos, 8 peças, 19 links conferidos com a fonte
OK src/controles.js
OK src/dados.js
OK src/interface.js
OK src/mundo.js
OK src/progresso.js
OK src/robo.js
OK processo/processo.js
OK vendor/three/three.module.js
OK: 31 arquivos locais referenciados existem
OK: 5 rodadas, 10 documentos integrais, 4 revisões, 5 capturas na galeria
OK: cota medida só nas rodadas com leitura registrada
OK: layout estático em 360 px no WeasyPrint, com os documentos abertos e sem conteúdo fora da largura
```

A verificação visual em navegador real ficou pendente. A área isolada bloqueou a inicialização do Chromium com `shutdown: Operation not permitted (1)`.