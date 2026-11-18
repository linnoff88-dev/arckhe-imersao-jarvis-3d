#!/usr/bin/env python3
"""Confere conteudo/evento.json contra a página-fonte. Sai com 1 se houver erro."""
import html
import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FONTE = (RAIZ / "fonte/criando-seu-jarvis.html").read_text(encoding="utf-8", errors="ignore")
PROIBIDAS = """revolucionar revolucionário revolucionaria mergulhar desvendar jornada potencializar alavancar robusto
sinergia holístico transformador desbloquear game-changer""".split()
EXPRESSOES = ["sem esforço", "sem complicação", "de ponta", "divisor de águas", "mudar o jogo", "é importante destacar",
              "vale ressaltar", "cabe mencionar", "em suma", "nesse sentido", "não é apenas", "mais do que apenas",
              "é aí que entra", "diga adeus", "comenta ", "link na bio", "me pede o link"]
ABERTURAS = ("imagine", "pense num", "se você", "neste momento", "então", "hoje vamos", "neste vídeo", "você sabia", "eu fiz")
erros = []


def plano(texto):
    return " ".join(html.unescape(re.sub(r"<[^>]+>", " ", texto)).split())


FONTE_TXT = plano(re.sub(r"(?is)<(script|style|svg)[^>]*>.*?</\1>", " ", FONTE))
URLS = set(re.findall(r'href="(https?://[^"]+)"', FONTE))
# Links internos da fonte valem, mas no endereço completo: o evento fica em outro site.
URLS |= {"https://eventos.inema.pro" + u for u in re.findall(r'href="(/[^"#]*)"', FONTE)}


def erro(msg):
    erros.append(msg)


def textos(no, caminho=""):
    if isinstance(no, dict):
        for k, v in no.items():
            if k not in {"url", "id", "youtube_id", "tipo", "parte_robo"}:
                yield from textos(v, f"{caminho}.{k}")
    elif isinstance(no, list):
        for i, v in enumerate(no):
            yield from textos(v, f"{caminho}[{i}]")
    elif isinstance(no, str):
        yield caminho, no


def urls(no):
    if isinstance(no, dict):
        for k, v in no.items():
            if k == "url" and v is not None:
                yield v
            else:
                yield from urls(v)
    elif isinstance(no, list):
        for v in no:
            yield from urls(v)


def principal():
    arq = RAIZ / "conteudo/evento.json"
    if not arq.exists():
        print("ERRO: conteudo/evento.json não existe")
        return 1
    d = json.loads(arq.read_text(encoding="utf-8"))
    for chave in "titulo subtitulo chamada apresentador pecas palcos portas alem fecho".split():
        if chave not in d:
            erro(f"falta a chave {chave}")
    if erros:
        print("\n".join("ERRO: " + e for e in erros))
        return 1

    etapas = re.findall(r"\b([1-6])\.\s+(.{5,60}?)(?=\s+(?:Os 10 passos|Um assistente só|O seu Jarvis no|Um assistente de voz|Um painel que|O diário de falhas))", FONTE_TXT)
    titulos = {int(n): t.strip() for n, t in etapas}
    if len(d["palcos"]) != 6:
        erro(f"palcos: esperava 6, veio {len(d['palcos'])}")
    if len(d["pecas"]) != 8:
        erro(f"peças: esperava 8, veio {len(d['pecas'])}")
    for i, p in enumerate(d["palcos"], 1):
        for campo in "id numero titulo ganho pecas materiais video fala tarefa pronto_quando".split():
            if campo not in p:
                erro(f"palco {i}: falta {campo}")
        if p.get("numero") != i:
            erro(f"palco {i}: numero fora de ordem")
        if titulos.get(i) and p.get("titulo") != titulos[i]:
            erro(f"palco {i}: título difere da fonte ({titulos[i]!r})")
        if not p.get("materiais"):
            erro(f"palco {i}: sem material")
        v = p.get("video")
        if v and v.get("youtube_id") and v["youtube_id"] not in v.get("url", ""):
            erro(f"palco {i}: youtube_id não bate com a url")
    ids = [x["id"] for x in d["pecas"]]
    usados = [x for p in d["palcos"] for x in p.get("pecas", [])]
    if sorted(ids) != sorted(usados):
        erro("cada peça precisa estar em exatamente um palco")
    for x in d["pecas"]:
        if x["nome"] not in FONTE_TXT:
            erro(f"peça fora da fonte: {x['nome']}")
    if d["apresentador"].get("video") is not None:
        erro("apresentador.video precisa ser null")
    if len(d["portas"]) != 3:
        erro("portas: esperava 3")
    for u in urls(d):
        if u not in URLS:
            erro(f"url fora da fonte: {u}")
    f = d["fecho"]
    if "?" not in f.get("pergunta", ""):
        erro("fecho.pergunta precisa ser pergunta")
    if "grátis no inema.club, direto na internet" not in f.get("cta", ""):
        erro("fecho.cta sem a frase combinada")
    for onde, t in textos(d):
        baixo = t.lower()
        for p in PROIBIDAS:
            if re.search(rf"\b{re.escape(p)}", baixo):
                erro(f"{onde}: palavra proibida '{p}'")
        for p in EXPRESSOES:
            if p in baixo:
                erro(f"{onde}: expressão proibida '{p.strip()}'")
        if onde.endswith((".fala", ".abertura", ".encerramento")):
            if baixo.startswith(ABERTURAS):
                erro(f"{onde}: abertura proibida")
            if re.search(r"\b20\d\d\b", t):
                erro(f"{onde}: ano em algarismo em fala")
        if "!!" in t:
            erro(f"{onde}: '!!'")
    if not (RAIZ / "conteudo/roteiro.md").exists():
        erro("falta conteudo/roteiro.md")
    if erros:
        print("\n".join("ERRO: " + e for e in erros))
        print(f"REPROVADO: {len(erros)} erro(s)")
        return 1
    print(f"OK: {len(d['palcos'])} palcos, {len(d['pecas'])} peças, {len(set(urls(d)))} links conferidos com a fonte")
    return 0


if __name__ == "__main__":
    sys.exit(principal())
