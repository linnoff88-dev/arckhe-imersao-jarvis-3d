# Revisão da rodada 4

Testado em Chromium real com WebGL (SwiftShader), 1440x900, 390x780 e 360x740. Capturas em `capturas-r4/`.

## Passou
- Robô com forma humana e capacete liso. Luz quente e sombras reais.
- Palco enquadrado de frente, com o telão inteiro ao lado do painel.
- Andar para frente por 1,5 s levou de z 4,00 a z 1,38, e a colisão parou o visitante antes do robô.
- Sem erro no console nos três tamanhos testados.

## Reprovado
1. Com 0 de 6 etapas, o robô já aparece completo. A montagem perdeu o sentido.
2. "Marcar como feita" ficou no topo da coluna, e o pedido era no rodapé.
3. Na posição inicial, os telões 02 e 04 encostam no topo e passam por baixo da interface.
4. Na entrada, o título está apertado demais e "Recomeçar" fica abaixo da dobra em 1440x900.
