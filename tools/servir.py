#!/usr/bin/env python3
"""Serve só os arquivos públicos do evento. Uso: tools/servir.py <ip> [porta]"""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

RAIZ = Path(__file__).resolve().parent.parent
PASTAS = ("src", "conteudo", "marca", "vendor", "fonte/assets", "processo")
BLOQUEADOS = {"eventos.jsonl", "erros.txt"}


def permitido(caminho):
    rota = unquote(urlsplit(caminho).path).strip("/")
    partes = rota.split("/") if rota else []
    if any(p.startswith(".") or p == ".." for p in partes) or (partes and partes[-1] in BLOQUEADOS):
        return False
    return not rota or rota == "index.html" or any(rota == p or rota.startswith(p + "/") for p in PASTAS)


class Publico(SimpleHTTPRequestHandler):
    def send_head(self):
        if not permitido(self.path):
            self.send_error(404)
            return None
        return super().send_head()

    def list_directory(self, path):
        self.send_error(404)
        return None


if __name__ == "__main__":
    ip = sys.argv[1]
    porta = int(sys.argv[2]) if len(sys.argv) > 2 else 8791
    print(f"http://{ip}:{porta}/", flush=True)
    ThreadingHTTPServer((ip, porta), partial(Publico, directory=str(RAIZ))).serve_forever()
