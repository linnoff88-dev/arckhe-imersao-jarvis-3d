# Falhas

| data | o que quebrou | menor correção | prompt \| infra |
|---|---|---|---|
| 2026-11-18 | Iframe ultrapassava a altura do telão, sobretudo em Shorts | dimensionar o iframe pelos dois limites do telão e centralizar | infra |
| 2026-11-18 | Robô apareceu completo com 0 de 6 etapas após o acabamento | mandar manter as placas nas 8 peças e conferir captura com 0 etapas | prompt |
| 2026-11-18 | Cota medida vinha vazia porque o script lia `~/.codex` e a conta ativa fica em `CODEX_HOME` | ler `CODEX_HOME` antes do caminho padrão | infra |
| 2026-11-18 | Validador recusou links internos relativos da fonte | aceitar o link interno só no endereço completo | prompt |
