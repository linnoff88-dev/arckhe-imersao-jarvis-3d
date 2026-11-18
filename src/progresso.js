const chave = 'inema.imersao-jarvis-3d.v1';
export function progresso(palcos) {
  const numeros = new Set(palcos.map(p => p.numero));
  let salvo;
  try { salvo = JSON.parse(localStorage.getItem(chave)); } catch {}
  let nome = typeof salvo?.nome === 'string' ? salvo.nome.slice(0,60) : '';
  let aberturaVista=salvo?.aberturaVista===true;
  const feitas = new Set((Array.isArray(salvo?.feitas) ? salvo.feitas : []).filter(n => numeros.has(n)));
  function salvar() {
    try { localStorage.setItem(chave, JSON.stringify({nome, aberturaVista, feitas:[...feitas]})); } catch {}
  }
  return {
    get nome() { return nome; }, get feitas() { return [...feitas].sort((a,b)=>a-b); },
    get aberturaVista(){return aberturaVista;},
    apresentar(){aberturaVista=true;salvar();},
    identificar(valor) { nome = valor.trim().slice(0,60); salvar(); },
    marcar(n) { if (numeros.has(n)) { feitas.add(n); salvar(); } },
    limpar() { aberturaVista=false; nome = ''; feitas.clear(); salvar(); }
  };
}
