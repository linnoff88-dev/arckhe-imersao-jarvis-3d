# Revisão da rodada 3

Testado em Chromium real com WebGL (SwiftShader), 1440x900, 390x780 e 360x740. Capturas em `capturas-r3/`.

## Passou
- Canvas em 1440x900 sem rolagem, Sora e Inter carregadas.
- Arrastar para a direita gira a câmera, vídeo abre em `youtube-nocookie.com` só depois do clique.
- Marcar etapa fecha o painel, vira para o robô e encaixa a peça. As 8 peças e o fecho aparecem.
- Continuar disponível após recarregar. Celular sem rolagem lateral.

## Reprovado
1. Cabeça do robô parece chapas empilhadas com um chapéu. O corpo pronto ainda é um boneco de blocos.
2. Hangar cinza e sem sombra. A luz âmbar de palco sumiu.
3. Ao abrir o palco, a câmera fica perto demais e olha para cima. O telão sai cortado e torto.
4. "Marcar como feita" fica abaixo da dobra em 1440x900, e "Ir ao próximo palco" continua visível com o painel aberto.
5. Andar para trás por 1,5 s moveu só 0,2 m no teste. Verificar velocidade com poucos quadros por segundo.
