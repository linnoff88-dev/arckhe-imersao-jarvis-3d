Rodada 3: transforme o protótipo em imersão. Leia `AGENTS.md`, `processo/BRIEFING.md`, `processo/revisoes/revisao-r2.md` e o código atual. O revisor testou em navegador real. Corrija os 8 pontos reprovados sem quebrar o que passou.

1. **Tela cheia.** No modo 3D, o canvas ocupa 100% da janela (`100dvh`), sem rolagem da página. Tudo vira interface flutuante e discreta sobre a cena:
   - canto superior esquerdo: logo pequeno;
   - canto superior direito: crachá, "N de 6 etapas" e botão "Agenda";
   - parte inferior: dica curta de controles, que some após o primeiro movimento, e botão "Ir ao próximo palco";
   - saída para "Assistir sem 3D" no menu da agenda.
   A fala de abertura do apresentador aparece uma vez, como legenda inferior, e pode ser fechada.

2. **Robô.** Refaça `src/robo.js`. Humanoide industrial adulto, cerca de 2,2 m, ombros largos, cintura estreita, membros afinando, placas angulares com chanfro (use `ExtrudeGeometry`, caixas e cilindros facetados), mãos com dedos simples. Metal cinza-claro fosco `#b9bdc4` sobre estrutura grafite. Nada de esferas à mostra nas juntas nem cor creme. Cabeça alongada, com visor preto largo e curvo desde o início.
   No início ele é uma **estrutura grafite inacabada**, com vãos visíveis. Cada uma das 8 peças é grande o bastante para ser vista a 6 metros e deixa o robô visivelmente mais completo. Com as 8, a armadura fecha.

3. **Palcos.** Distribua os 6 em um arco de cerca de 280 graus em volta do robô, com distâncias iguais. Da posição inicial devem aparecer o robô e pelo menos 3 telões inteiros em 1440x900. Telões maiores, número e título ocupando a maior parte da largura, título com quebra automática em até 3 linhas. Espere `document.fonts.load` antes de desenhar o canvas. Use luz principal neutra-quente e âmbar só como acento, para o metal não ficar amarelo.

4. **Sessão e encaixe.** O painel da sessão vira coluna lateral direita de até 440 px, com rolagem própria, deixando o palco visível. No celular, vira folha inferior de até 70% da altura. Ao clicar em "Marcar como feita": fecha o painel, a câmera vira para o robô por cerca de 2 s, a peça encaixa com luz breve e aparece o aviso "Peça encaixada: <nome>" com o botão do próximo palco. Com `prefers-reduced-motion`, sem giro. Na última etapa, depois do encaixe, o visor ganha a linha âmbar e o fecho abre na mesma coluna.

5. **Foco.** Título de painel recebe foco por programa sem moldura. Controles continuam com foco visível. `Esc` fecha o painel aberto.

6. **Fontes.** Carregue Sora e Inter do Google Fonts com `preconnect` e `display=swap`, mantendo alternativa do sistema.

7. **Continuar.** Com progresso salvo, a entrada mostra "Continuar: N de 6 etapas" como ação principal e "Recomeçar" como opção discreta, com confirmação na própria tela.

8. **Modo sem 3D.** Troque "Ir até lá" por "Abrir etapa" e mostre vídeo, tarefa e botão de marcar no mesmo fluxo. Mostre uma lista textual das 8 peças com estado "encaixada" ou "falta".

**Controles.** Mantenha WASD, setas, arrastar para olhar sem inversão, clique para ir e colisão. No toque, joystick à esquerda e arrasto à direita para olhar. Nada pode cobrir os botões.

**Teste.** Amplie `window.__evento.estado()` com `posicao: {x, z}`, `direcao`, `painel` (nome do painel aberto ou null) e `continuar` (booleano).

Verifique com `python3 tools/validar_conteudo.py`, `node --check` em cada arquivo de `src/` e seus testes locais. Na resposta, cole as saídas reais e liste o que depende de navegador para confirmar.
