Corrigi o tamanho do player em [src/estilo.css](/home/nmaldaner/projetos/imersao-jarvis-3d/src/estilo.css:121). O contêiner acompanha o retângulo projetado do telão, com fundo preto e `overflow: hidden`. O iframe fica centralizado. Vídeos 16:9 usam a maior dimensão que cabe nos dois eixos. Shorts usam toda a altura, com largura proporcional a 9:16. O botão “Parar vídeo” continua sobreposto no canto superior direito.

`estado().videoTelao.player` já lia o retângulo real do iframe com `getBoundingClientRect()`. A correção exigiu apenas CSS.

**Saídas reais da validação de conteúdo e sintaxe**

```text
OK: 6 palcos, 8 peças, 19 links conferidos com a fonte
OK processo/processo.js
OK src/controles.js
OK src/dados.js
OK src/interface.js
OK src/mundo.js
OK src/progresso.js
OK src/robo.js
OK vendor/three/three.module.js
```

**Teste das dimensões calculadas a partir do CSS**

```text
desktop 858×429 | 16:9 | 762.67×429.00 px OK
desktop 858×429 | Short | 241.31×429.00 px OK
celular 342×171 | 16:9 | 304.00×171.00 px OK
celular 342×171 | Short | 96.19×171.00 px OK
limite pela largura 320×260 | 16:9 | 320.00×180.00 px OK
limite pela largura 320×260 | Short | 146.25×260.00 px OK
```

**Trecho da saída do teste local de integração**, que terminou com código `0`:

```text
1440×900: projeção dos 6 palcos, player único, Shorts, câmera parada, recolher, parar e agenda OK
360×740: projeção dos 6 palcos, player único, Shorts, câmera parada, recolher, parar e agenda OK
740×360: projeção dos 6 palcos, player único, Shorts, câmera parada, recolher, parar e agenda OK
Troca de palco, Fechar, cancelamento do diálogo e Marcar removem o iframe
```

**Verificação pendente em navegador real.** O sandbox bloqueou a inicialização do Chromium com `shutdown: Operation not permitted (1)`. O encaixe passou no teste de cálculo e o botão passou no teste de interação simulada. A medição final do DOM e a visibilidade do botão em tela ficaram sem confirmação visual.