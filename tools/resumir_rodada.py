#!/usr/bin/env python3
"""Resume uma rodada do Codex e atualiza processo/dados.json."""
import collections
import glob
import json
import os
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PRECO_ENTRADA, PRECO_CACHE, PRECO_SAIDA = 8.0, 0.40, 40.0  # US$/1M, valores do vídeo de referência
US_POR_PONTO = 2.30  # medido nos registros locais de gpt-6-astra até 20/10/2026


def ler_json(linha):
    try:
        return json.loads(linha)
    except json.JSONDecodeError:
        return None


def cota(thread):
    if not thread:
        return None
    base = os.environ.get("CODEX_HOME") or os.path.expanduser("~/.codex")
    achados = glob.glob(f"{base}/sessions/**/*{thread}*.jsonl", recursive=True)
    valores = []
    for arq in achados:
        for linha in open(arq, errors="ignore"):
            if "token_count" not in linha:
                continue
            o = ler_json(linha) or {}
            limites = (o.get("payload") or {}).get("rate_limits") or {}
            for janela in (limites.get("primary"), limites.get("secondary")):
                if janela and janela.get("window_minutes") == 10080:
                    valores.append(janela.get("used_percent"))
    return {"inicio": valores[0], "fim": valores[-1]} if valores else None


def resumir(pasta):
    uso = collections.Counter()
    itens = collections.Counter()
    arquivos, thread = set(), None
    for linha in open(pasta / "eventos.jsonl", errors="ignore"):
        o = ler_json(linha)
        if not o:
            continue
        tipo = o.get("type")
        if tipo == "thread.started":
            thread = o.get("thread_id")
        elif tipo == "turn.completed":
            uso.update({k: v for k, v in (o.get("usage") or {}).items() if isinstance(v, int)})
        elif tipo == "item.completed":
            item = o.get("item") or {}
            itens[item.get("type") or item.get("item_type") or "outro"] += 1
            for mudanca in item.get("changes") or []:
                if mudanca.get("path"):
                    arquivos.add(os.path.relpath(mudanca["path"], RAIZ) if os.path.isabs(mudanca["path"]) else mudanca["path"])
    entrada, cache, saida = uso["input_tokens"], uso["cached_input_tokens"], uso["output_tokens"]
    custo = ((entrada - cache) * PRECO_ENTRADA + cache * PRECO_CACHE + saida * PRECO_SAIDA) / 1e6
    return {
        "rodada": pasta.name,
        "modelo": "gpt-6.2-astra",
        "esforco": "medium",
        "inicio": (pasta / "inicio.txt").read_text().strip(),
        "segundos": int((pasta / "segundos.txt").read_text()),
        "codigo_saida": int((pasta / "codigo.txt").read_text()),
        "tokens": {"entrada": entrada, "cache": cache, "saida": saida},
        "custo_equivalente_usd": round(custo, 2),
        "cota_estimada_pct": round(custo / US_POR_PONTO, 1),
        "cota_medida_pct": cota(thread),
        "itens": dict(itens),
        "arquivos": sorted(arquivos),
        "prompt": f"rodadas/{pasta.name}/prompt.md",
        "resposta": f"rodadas/{pasta.name}/resposta.md",
    }


def principal():
    pasta = Path(sys.argv[1]).resolve()
    resumo = resumir(pasta)
    (pasta / "resumo.json").write_text(json.dumps(resumo, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    rodadas = [json.loads(p.read_text(encoding="utf-8")) for p in sorted((RAIZ / "processo/rodadas").glob("*/resumo.json"))]
    total = {
        "segundos": sum(r["segundos"] for r in rodadas),
        "custo_equivalente_usd": round(sum(r["custo_equivalente_usd"] for r in rodadas), 2),
        "cota_estimada_pct": round(sum(r["cota_estimada_pct"] for r in rodadas), 1),
        "tokens_entrada": sum(r["tokens"]["entrada"] for r in rodadas),
        "tokens_saida": sum(r["tokens"]["saida"] for r in rodadas),
    }
    dados = {"rodadas": rodadas, "total": total}
    (RAIZ / "processo/dados.json").write_text(json.dumps(dados, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({k: resumo[k] for k in ("rodada", "segundos", "codigo_saida", "tokens", "custo_equivalente_usd", "cota_estimada_pct", "cota_medida_pct", "itens")}, ensure_ascii=False))


if __name__ == "__main__":
    principal()
