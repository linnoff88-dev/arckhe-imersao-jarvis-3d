#!/usr/bin/env bash
# Roda uma etapa no Codex pela assinatura e guarda tudo em processo/rodadas/.
# Uso: tools/rodar_codex.sh processo/prompts/01-conteudo.md
set -uo pipefail
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
PROMPT="$RAIZ/${1:?informe o arquivo do prompt}"
NOME="$(basename "$PROMPT" .md)"
SAIDA="$RAIZ/processo/rodadas/$NOME"
[ -e "$SAIDA" ] && SAIDA="$SAIDA-$(date +%H%M%S)"
mkdir -p "$SAIDA"
cp "$PROMPT" "$SAIDA/prompt.md"
INICIO=$(date +%s)
date -Is > "$SAIDA/inicio.txt"
systemd-run --user --scope --quiet -p MemoryMax=8G \
  timeout 45m env -u OPENAI_API_KEY -u CODEX_API_KEY \
  codex exec --json --skip-git-repo-check \
    -m gpt-6.2-astra -c 'model_reasoning_effort="medium"' \
    -s workspace-write -C "$RAIZ" \
    -o "$SAIDA/resposta.md" "$(cat "$PROMPT")" \
  > "$SAIDA/eventos.jsonl" 2> "$SAIDA/erros.txt"
CODIGO=$?
echo $(( $(date +%s) - INICIO )) > "$SAIDA/segundos.txt"
echo "$CODIGO" > "$SAIDA/codigo.txt"
python3 "$RAIZ/tools/resumir_rodada.py" "$SAIDA"
exit "$CODIGO"
