O vídeo agora toca no telão do palco. **Assistir no telão** e **Assistir** no painel abrem o mesmo iframe, criado só depois do clique. Enquanto o vídeo toca, a câmera fica parada e o painel continua utilizável. No celular, a folha pode ser recolhida sem interromper o vídeo.

O player acompanha a projeção dos quatro cantos do telão. Shorts ficam centralizados sobre fundo preto. Os palcos sem vídeo mantêm número e título, e o modo sem 3D conserva o player na própria página. `window.__evento.estado().videoTelao` expõe o estado e as medidas em pixels.

**Saídas reais da validação de conteúdo e da checagem de sintaxe**

```text
OK: 6 palcos, 8 peças, 19 links conferidos com a fonte
OK src/controles.js
OK src/dados.js
OK src/interface.js
OK src/mundo.js
OK src/progresso.js
OK src/robo.js
OK processo/processo.js
OK vendor/three/three.module.js
```

**Saídas dos testes locais com Three.js e DOM simulado**

```text
1440×900: projeção dos 6 palcos, player único, Shorts, câmera parada, recolher, parar e agenda OK
360×740: projeção dos 6 palcos, player único, Shorts, câmera parada, recolher, parar e agenda OK
740×360: projeção dos 6 palcos, player único, Shorts, câmera parada, recolher, parar e agenda OK
Troca de palco, Fechar, cancelamento do diálogo e Marcar removem o iframe
OK: 6 etapas em fluxo sem 3D, vídeo sob clique, lista textual e fecho
```

**Pendente de navegador real.** O Chromium foi bloqueado ao iniciar com `Operation not permitted`. A reprodução e o corte do áudio do YouTube, o `Esc` com foco dentro do iframe e o alinhamento visual ao girar um celular ainda precisam de confirmação.