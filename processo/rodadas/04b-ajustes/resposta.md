Apliquei os quatro ajustes da rodada 4b. O robô começa com a estrutura grafite e o visor preto. As placas aparecem conforme as etapas são feitas, e `pecasVisiveis` acompanha os grupos exibidos. Com as oito peças, as 66 malhas visíveis coincidem com as do robô completo da rodada 4.

Na sessão 3D, o conteúdo rola entre o cabeçalho e o rodapé fixo. Ao reabrir uma etapa concluída, o botão mostra **Etapa feita**. Ajustei a câmera inicial, clareei a luz ambiente do hangar e reduzi o título da entrada, com `letter-spacing: -.01em`.

**Limite da verificação visual.** O sandbox bloqueou a abertura do Chromium. Verifiquei o enquadramento pela projeção do Three.js, o fluxo da sessão com eventos simulados e a entrada com WeasyPrint. A aparência final da iluminação ficou sem conferência em navegador real.

**Saídas reais do validador e da checagem de sintaxe** (`OK` impresso após cada `node --check` retornar zero).

```text
OK: 6 palcos, 8 peças, 19 links conferidos com a fonte
OK src/controles.js
OK src/dados.js
OK src/interface.js
OK src/mundo.js
OK src/progresso.js
OK src/robo.js
```

**Saídas reais dos testes locais**

```text
WeasyPrint 1440×900: título em 2 linhas, cartão até y=734, Recomeçar até y=687
Telão 2: topo a 126.5 px
Telão 3: topo a 201.3 px
Telão 4: topo a 126.5 px
Telões iniciais [ 2, 3, 4 ]
OK: projeção Three.js em 1440×900 — telões inteiros 2, 3, 4
0/6: estrutura grafite e visor preto; 0 grupos de armadura visíveis
Robô 41.4% da altura, folga para o telão 12 px
Movimento a 2 fps: 4,50 m em 1,50 s
Movimento a 60 fps: 4,50 m em 1,50 s; pausa de 2 s limitada a 1,50 m
OK: arrasto para a direita, joystick e clique no piso (eventos simulados)
1440×900: 6 telões inteiros e nivelados na área livre; projeção restaurada
390×780: 6 telões inteiros e nivelados na área livre; projeção restaurada
360×740: 6 telões inteiros e nivelados na área livre; projeção restaurada
OK: WASD, colisão com o robô, dica, agenda e fechamento
OK: 6 sessões 3D simuladas, encaixe de 8 grupos de armadura, movimento reduzido e fecho
6/6: 66 malhas visíveis idênticas à R4 em geometria, pose, cor e acabamento; rodapé “Etapa feita”
OK: retomada, cancelamento e confirmação de recomeço
OK: 6 etapas em fluxo sem 3D, vídeo sob clique, lista textual e fecho
OK: progresso sem localStorage
```