# Revisão da rodada 2

Testado em Chromium real com WebGL (SwiftShader), 1440x900 e 360x740. Capturas em `capturas-r2/`.

## Passou
- Entrada, crachá, modo 3D com `webgl: true`, sem erro no console.
- `irPara` nos palcos, 6 etapas marcadas, 8 peças visíveis, fecho aberto.
- Progresso mantido ao recarregar.
- Celular em 360 px: `scrollWidth` 360, menor letra 14 px.

## Reprovado
1. O 3D está em uma caixa no fim de uma página com rolagem. Não há imersão.
2. O robô parece boneco: juntas redondas, membros de cápsula e corpo creme. Ele também já parece pronto antes de qualquer etapa.
3. Da posição inicial só dois telões ficam inteiros, e os títulos 03 e 04 estão pequenos.
4. O painel central cobre o palco e o robô. Quem marca a etapa não vê a peça encaixar.
5. Título do painel recebe foco com moldura amarela grossa.
6. Sora e Inter não carregam. A página usa fonte substituta.
7. Depois de recarregar, a entrada não oferece continuar de onde parou.
8. No modo sem 3D, "Ir até lá" não descreve a ação.
