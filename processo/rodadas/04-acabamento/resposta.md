Refiz o robô com capacete liso, visor preto curvo, peitoral afunilado, juntas escuras e dedos articulados. Os oito encaixes continuam funcionando. Na projeção inicial em 1440×900, o robô ocupa **42,8% da altura**, com **12 px de folga** até o telão atrás dele.

O hangar agora usa iluminação quente com recorte âmbar, piso acetinado, `ACESFilmicToneMapping` e sombras de 2048 px no desktop e 1024 px no celular. Ao abrir um palco, a câmera fica nivelada a cerca de 5 m do telão. O conteúdo do painel rola acima de “Marcar como feita”, e “Ir ao próximo palco” fica oculto enquanto o painel está aberto.

**Verificação visual pendente.** O sandbox bloqueou a inicialização do Chromium. Medi o enquadramento com a câmera e as geometrias do Three.js e testei a interface em DOM simulado. A aparência final da iluminação e a posição do rodapé ainda precisam de conferência em navegador real.

**Saídas reais dos validadores e testes locais**

```text
OK: 6 palcos, 8 peças, 19 links conferidos com a fonte
OK src/controles.js
OK src/dados.js
OK src/interface.js
OK src/mundo.js
OK src/progresso.js
OK src/robo.js
Telões iniciais [ 2, 3, 4 ]
OK: projeção Three.js em 1440×900 — telões inteiros 2, 3, 4
Robô 42.8% da altura, folga para o telão 12 px
Movimento a 2 fps: 4,50 m em 1,50 s
Movimento a 60 fps: 4,50 m em 1,50 s; pausa de 2 s limitada a 1,50 m
OK: arrasto para a direita, joystick e clique no piso (eventos simulados)
1440×900: 6 telões inteiros e nivelados na área livre; projeção restaurada
390×780: 6 telões inteiros e nivelados na área livre; projeção restaurada
360×740: 6 telões inteiros e nivelados na área livre; projeção restaurada
OK: WASD, colisão com o robô, dica, agenda e fechamento
OK: 6 sessões 3D simuladas, encaixe de 8 grupos de armadura, movimento reduzido e fecho
OK: retomada, cancelamento e confirmação de recomeço
OK: 6 etapas em fluxo sem 3D, vídeo sob clique, lista textual e fecho
OK: progresso sem localStorage
```