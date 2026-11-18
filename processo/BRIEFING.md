# Briefing: Imersão Jarvis 3D

## O pedido
Transformar a área "Criando seu Jarvis" (https://eventos.inema.pro/criando-seu-jarvis/) em um evento de imersão em 3D, feito com Codex + GPT-6.2 Astra em nível médio, mostrando todo o processo.

## CHAMADA
- `dor_ou_desejo`: desejo
- `quem`: você, que usa IA todo dia e queria um assistente só seu
- `nucleo`: "Você vai montar um assistente de IA que lembra de você e só faz o perigoso com o seu OK. É isso que estas seis etapas fazem. Entre no hangar e monte o seu, peça por peça."
- `por_que_importa`: "O chat comum esquece o que você disse, e um agente sem trava pode mexer no que não devia."
- `metodo`: "Criando seu Jarvis"
- `formato`: promessa

## A ideia
O visitante entra em um **hangar de montagem**. No centro está um robô humanoide incompleto: o Jarvis dele. Em volta há **6 palcos**, um para cada etapa da fonte. Em cada palco ele assiste ao material, confere o que ganhou e marca a etapa como feita. As peças daquela etapa encaixam no robô. Ao concluir os 6, o robô liga.

## O que precisa existir
1. **Entrada:** tela com a chamada, campo opcional de nome e dois botões do mesmo peso: "Entrar no hangar" e "Assistir sem 3D".
2. **Crachá:** mostra o nome digitado. O nome fica só no navegador. Sem nome, usa "Visitante".
3. **Hangar 3D (Three.js em `vendor/three/three.module.js`):** chão, palcos com telão e título legível, caminho até cada palco, luz quente âmbar.
4. **Movimento:** WASD e setas; arrastar o mouse gira a câmera no sentido natural, sem inversão; clique no chão ou no palco leva até lá; no toque, controle na tela. Colisão simples: não atravessar robô nem telões.
5. **Agenda:** painel com as 6 etapas, estado (a fazer ou feita, sempre com texto) e botão "Ir até lá".
6. **Sessão do palco:** painel com título, o que você ganha, material, tarefa, "pronto quando" e botão "Marcar como feita". Vídeo do YouTube só carrega depois do clique, em `youtube-nocookie.com`. Etapa sem vídeo na fonte mostra o guia ou curso, sem inventar vídeo.
7. **Robô:** humanoide industrial, liso, fosco ou metálico, estilo Tesla Optimus, com **visor preto na frente da cabeça**. Nunca fofo, cartoon, com olhinhos ou rosto de tela. As 8 peças da fonte aparecem no robô conforme as etapas são feitas.
8. **Final:** com os 6 palcos feitos, o robô liga e aparece o fecho: uma pergunta de verdade + "os cursos e guias estão grátis no inema.club, direto na internet".
9. **Modo sem 3D:** a mesma programação e o mesmo progresso em página comum. É aberto automaticamente se o WebGL falhar. Funciona bem em celular de 360 px.
10. **Progresso:** salvo em `localStorage` com `try/catch`. O site funciona sem ele.
11. **Apresentador:** há um lugar para o vídeo do avatar do Nei em `conteudo/evento.json` (`apresentador.video: null`). Enquanto for `null`, mostre só o texto da fala. Nunca mostre vídeo falso.

## Não pode
- Fingir que é ao vivo: sem contagem regressiva, horário, "pessoas online", plateia ou chat falso.
- Inventar participantes, depoimentos ou números.
- Texto dentro do 3D que ninguém consegue ler. O que importa também fica em HTML.
- Informação só por cor. Verde só como estado "feito", sempre com rótulo.
- Fonte de jogo, neon azul, emoji no meio do texto, letra de leitura menor que 14 px.

## Design
Linha 2 de `~/projetos/inema-design/DESIGN.md`: fundo `#0c0c10`, cartão `#16161e`, borda `#272730`, texto `#e9e9ee`, secundário `#9a9aa6`, acento `#FACC15`, botão com letra `#1a1206`, raio 10 e 14 px, títulos Sora, corpo Inter, cor só por variável CSS. Logo: `marca/logo-inema-club-horizontal.png` em lugar largo ou `marca/logo-inema-club-quadrado.png` em lugar pequeno, nunca os dois juntos.

## Acessibilidade e desempenho
Teclado em todo painel, foco visível, `aria-label` nos controles, `prefers-reduced-motion` respeitado, nada de rolagem horizontal, `devicePixelRatio` limitado a 2, geometria leve e sem modelos externos.

## Arquivos esperados
`index.html`, `src/*.js`, `src/estilo.css`, `conteudo/evento.json`, `conteudo/roteiro.md`, `processo/index.html`.
