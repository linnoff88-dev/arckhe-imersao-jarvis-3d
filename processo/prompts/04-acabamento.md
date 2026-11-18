Rodada 4: acabamento visual. Leia `AGENTS.md`, `processo/BRIEFING.md`, `processo/revisoes/revisao-r3.md` e o código atual. Veja também a imagem `fonte/assets/criando-seu-jarvis.jpg`: o robô dela é a referência de forma. Não quebre o que passou.

1. **Robô.** Refaça a forma, mantendo as 8 peças e a lógica de encaixe.
   - Cabeça: capacete único, alongado e liso, feito com `LatheGeometry` ou esfera achatada, com face preta brilhante grande e curva. Nada de chapas empilhadas.
   - Tronco: peitoral contínuo que afina até a cintura, com abdômen segmentado e pelve.
   - Braços e pernas: formas arredondadas e afinadas (`LatheGeometry` ou `CapsuleGeometry` com escala), placas externas com chanfro e juntas escuras embutidas. Ombros arredondados.
   - Mãos com dedos articulados simples.
   - Material: branco-pérola ou cinza-claro acetinado (`MeshStandardMaterial`, metalness cerca de 0,35, roughness cerca de 0,4), juntas pretas. Sem aparência de bloco, brinquedo ou cartoon.
   - Altura visível: da posição inicial, o robô ocupa cerca de 45% da altura da tela em 1440x900 e não encosta no telão atrás.

2. **Luz e hangar.** Sombras reais (`PCFSoftShadowMap`) do robô e dos palcos, em um mapa de até 2048. Foco quente sobre o robô, luz de recorte âmbar atrás dele e faixas âmbar nos palcos. Piso escuro acetinado, com reflexo sugerido por um brilho suave sob o robô. Fundo mais escuro, com névoa leve. Use `ACESFilmicToneMapping`. O resultado deve lembrar um palco com luz quente, sem ficar todo amarelo.

3. **Enquadramento do palco.** Ao abrir um palco, pare a cerca de 5 m do telão, câmera nivelada na altura dos olhos. O telão fica inteiro e reto na área livre à esquerda do painel. Use `camera.setViewOffset` ou ajuste equivalente, e restaure ao fechar. No celular, o telão fica inteiro acima da folha inferior.

4. **Painel.** "Marcar como feita" fica fixo no rodapé da coluna, sempre visível, com o conteúdo rolando acima dele. "Ir ao próximo palco" some enquanto houver painel aberto.

5. **Movimento.** Velocidade de 3 m/s independente de quadros por segundo. Limite cada passo de física a 0,05 s, repetindo os passos necessários para cobrir até 0,5 s de tempo real. Mantenha colisão com robô, palcos e paredes.

Mantenha `devicePixelRatio` até 2 e reduza sombras no celular. Verifique com `python3 tools/validar_conteudo.py`, `node --check` em cada arquivo de `src/` e seus testes locais. Cole as saídas reais na resposta.
