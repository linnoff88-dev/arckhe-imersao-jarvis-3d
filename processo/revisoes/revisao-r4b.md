# Revisão da rodada 4b

Testado em Chromium real com WebGL (SwiftShader), 1440x900, 390x780 e 360x740. Capturas em `capturas-r4b/`.

## Passou
- Com 0 de 6 etapas, o robô é só a estrutura escura com visor. Com 3 de 6, tem peitoral, antebraços, mão e coxas. Com 6 de 6, as 8 peças estão visíveis.
- "Marcar como feita" fica fixo no rodapé da coluna.
- Os telões 02, 03 e 04 aparecem inteiros na posição inicial.
- A entrada cabe em 1440x900, com o título em duas linhas.
- Vídeo só carrega depois do clique. Colisão, progresso, celular e modo sem 3D continuam funcionando.

## Observação
- O console registrou um aviso de `compute-pressure` vindo do player do YouTube depois da abertura do vídeo. Não vem do código do evento.
- O teste usou renderização por software. O desempenho em uma placa de vídeo real não foi medido.
