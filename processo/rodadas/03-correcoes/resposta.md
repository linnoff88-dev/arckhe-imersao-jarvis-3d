Implementei as correções dos oito pontos da revisão. O hangar ocupa a janela inteira, a sessão abre na lateral ou em folha inferior no celular, e o painel fecha para mostrar o encaixe da armadura. A entrada permite retomar ou recomeçar com confirmação. No modo sem 3D, cada etapa abre o material, a tarefa e a conclusão no próprio cartão.

A projeção da câmera em **1440 × 900** enquadrou os quatro cantos dos telões **2, 3 e 4** na posição inicial. As seis sessões chegaram ao fecho nos dois modos em teste simulado. `window.__evento.estado()` agora expõe `posicao`, `direcao`, `painel` e `continuar`.

**Saídas dos testes locais**

```text
OK: 6 palcos, 8 peças, 19 links conferidos com a fonte
OK src/controles.js
OK src/dados.js
OK src/interface.js
OK src/mundo.js
OK src/progresso.js
OK src/robo.js
OK: projeção Three.js em 1440×900 — telões inteiros 2, 3, 4
OK: arrasto para a direita, joystick e clique no piso (eventos simulados)
OK: WASD, colisão com o robô, dica, agenda e fechamento
OK: 6 sessões 3D simuladas, encaixe de 8 grupos de armadura, movimento reduzido e fecho
OK: retomada, cancelamento e confirmação de recomeço
OK: 6 etapas em fluxo sem 3D, vídeo sob clique, lista textual e fecho
OK: progresso sem localStorage
```

**Pendente de confirmação em navegador real.** O sandbox bloqueou a inicialização do Chromium com `shutdown: Operation not permitted (1)`. Ainda falta conferir a legibilidade dos telões com Sora e Inter carregadas, o aspecto do metal e das oito peças a seis metros, a luz do encaixe e o visor final. Em 360 × 740, falta conferir a rolagem da folha, o foco visível dos controles e o uso simultâneo do joystick e do arrasto sem cobrir os botões.