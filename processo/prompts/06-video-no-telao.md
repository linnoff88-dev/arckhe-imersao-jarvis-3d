Rodada 6: pedido do Nei depois de usar o evento: "quando vou para um painel, por que não roda o vídeo no painel grande?". Faça o vídeo tocar no telão do palco. Leia `AGENTS.md`, `processo/BRIEFING.md` e o código atual.

O player do YouTube é um iframe de outro domínio e não pode virar textura do WebGL. Use um iframe em HTML posicionado exatamente sobre o telão.

1. **Área do telão.** Em `src/mundo.js`, exponha a projeção dos 4 cantos da tela do telão do palco atual em pixels da janela, considerando `setViewOffset`. Atualize no redimensionamento e ao girar o celular.

2. **Chegada ao palco com vídeo.** Quando a câmera termina de enquadrar o palco, mostre sobre o telão um botão grande "Assistir no telão", com título e duração. Mantenha visíveis o número e o título do palco antes do clique. Nada do YouTube carrega antes do clique.

3. **Ao clicar.** O botão do telão e o botão "Assistir" do painel fazem a mesma coisa: criam um único iframe de `https://www.youtube-nocookie.com/embed/<id>?autoplay=1&rel=0&playsinline=1`, com `allow="autoplay; encrypted-media; picture-in-picture; fullscreen"`, `allowfullscreen` e `title`, ocupando a área do telão. O vídeo não abre mais dentro do painel. Vídeos verticais (Shorts) ficam centralizados, com as laterais pretas.

4. **Enquanto toca.** A câmera fica parada e os controles de andar ficam suspensos. Mostre sobre o canto do telão o botão "Parar vídeo". O painel continua aberto e usável ao lado. No celular, o telão fica inteiro acima da folha inferior, e a folha pode ser recolhida para ver melhor.

5. **Ao sair.** Fechar o painel, apertar `Esc`, ir a outro palco, marcar a etapa, abrir a agenda em tela estreita ou clicar em "Parar vídeo" remove o iframe e para o som.

6. **Sem vídeo.** Nos palcos sem vídeo, o telão continua com número e título, e nenhum botão de vídeo aparece. No modo sem 3D, o vídeo continua tocando na própria página, em largura total.

7. **Teste.** Inclua em `window.__evento.estado()` o campo `videoTelao`: `{ativo, youtubeId, telao: {x, y, largura, altura}, player: {x, y, largura, altura}}`, ou `null` quando não houver telão enquadrado.

Verifique com `python3 tools/validar_conteudo.py`, `node --check` em cada arquivo JS e seus testes locais. Cole as saídas reais e diga o que depende de navegador.
