Rodada 4b: ajustes finais do evento. Leia `AGENTS.md`, `processo/revisoes/revisao-r4.md` e o código atual. Mude só o necessário e mantenha a forma atual do robô.

1. **Robô inacabado no início.** Com 0 de 6 etapas, mostre só a estrutura grafite: esqueleto, juntas e cabeça com visor preto. A armadura clara do tronco, ombros, braços e pernas deve estar ausente. Distribua as placas entre as 8 peças, para que cada etapa deixe uma diferença clara. A soma das 8 forma exatamente o robô completo de hoje. `pecasVisiveis` continua coerente com o que aparece.

2. **Botão no rodapé.** Na coluna da sessão, a ordem é: cabeçalho, conteúdo com rolagem própria e "Marcar como feita" fixo no rodapé da coluna. Em etapa já feita, mostre o estado "Etapa feita" com texto.

3. **Enquadramento inicial.** Em 1440x900, afaste a câmera ou baixe os telões para que os telões 02, 03 e 04 fiquem inteiros, abaixo da interface do topo, com o robô inteiro à frente. Clareie um pouco o entorno, sem perder o contraste quente.

4. **Entrada.** Título com `letter-spacing` de -.01em e tamanho que deixe "Criando seu Jarvis" em até duas linhas. Em 1440x900, todo o cartão cabe na tela, inclusive "Recomeçar", sem rolagem.

Verifique com `python3 tools/validar_conteudo.py`, `node --check` em cada arquivo de `src/` e seus testes locais. Cole as saídas reais.
