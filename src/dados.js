export async function carregar(aviso) {
  try {
    const resposta = await fetch(new URL('../conteudo/evento.json', import.meta.url));
    if (!resposta.ok) throw new Error(String(resposta.status));
    return await resposta.json();
  } catch {
    aviso.hidden = false;
    aviso.textContent = 'Não foi possível abrir a programação. Recarregue a página para tentar de novo.';
    return null;
  }
}
