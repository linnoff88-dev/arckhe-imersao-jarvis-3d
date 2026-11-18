import {carregar} from './dados.js';
import {progresso} from './progresso.js';

const el=id=>document.getElementById(id);
const evento=await carregar(el('aviso'));
if(evento) iniciar(evento);

function iniciar(dados) {
  const {palcos,pecas,apresentador,fecho}=dados;
  const salvo=progresso(palcos), painel=el('painel'), corpo=el('sessao');
  let modo='entrada', palcoAtual=null, mundo=null, carregando=false;
  let painelAtual=null, rodada=0, origem=null;
  const conteiner=corpo.parentElement, telao=el('videoTelao');
  let player=null;
  function pararVideo(){
    player?.remove();
    player=null;
    el('capaTelao').hidden=false;
    el('pararVideo').hidden=true;
  }
  function sairDaSessao(){
    pararVideo();
    telao.hidden=true;
    mundo?.sairDoPalco();
    painel.classList.remove('sessao3d','recolhido');
    el('recolher').textContent='Recolher';
    el('recolher').setAttribute('aria-expanded','true');
  }
  function alinharTelao({x,y,largura,altura}){
    if(painelAtual!=='sessao')return;
    Object.assign(telao.style,{left:x+'px',top:y+'px',width:largura+'px',height:altura+'px'});
    telao.hidden=!obter(palcoAtual).video;
  }
  function assistir(video,botaoPainel){
    if(player)return;
    player=document.createElement('iframe');
    player.title=video.titulo;
    player.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
    player.allowFullscreen=true;
    player.referrerPolicy='strict-origin-when-cross-origin';
    player.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(video.youtube_id)+'?autoplay=1&rel=0&playsinline=1';
    if(modo==='sem-3d'){botaoPainel.replaceWith(player);return;}
    player.classList.toggle('vertical',video.url.includes('/shorts/'));
    telao.prepend(player);
    el('capaTelao').hidden=true;
    el('pararVideo').hidden=false;
    el('pararVideo').focus();
  }
  el('pararVideo').onclick=()=>{pararVideo();el('assistirTelao').focus();};
  el('recolher').onclick=()=>{
    const recolhido=painel.classList.toggle('recolhido');
    el('recolher').textContent=recolhido?'Expandir':'Recolher';
    el('recolher').setAttribute('aria-expanded',String(!recolhido));
  };
  function estadoVideo(){
    const projecao=mundo?.projecaoTelao();
    if(!projecao)return null;
    const {x,y,largura,altura}=projecao;
    const rect=player?.getBoundingClientRect();
    return {ativo:!!player,youtubeId:obter(palcoAtual).video?.youtube_id??null,telao:{x,y,largura,altura},
      player:rect?{x:rect.x,y:rect.y,largura:rect.width,altura:rect.height}:{x:0,y:0,largura:0,altura:0}};
  }
  const continuar=()=>salvo.feitas.length>0;
  const proxima=()=>palcos.find(p=>!salvo.feitas.includes(p.numero));
  const numero=n=>String(n).padStart(2,'0');
  const obter=n=>palcos.find(p=>p.numero===n);
  const visiveis=()=>salvo.feitas.flatMap(n=>obter(n).pecas);
  const completo=()=>salvo.feitas.length===palcos.length;
  const criar=(tag,texto,classe)=>{
    const no=document.createElement(tag); no.textContent=texto;
    if(classe)no.className=classe;
    return no;
  };
  function botao(texto,acao){
    const b=criar('button',texto); b.onclick=acao;return b;
  }
  function link(texto,url){
    const a=criar('a',texto);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;
  }
  for(const porta of dados.portas){
    el('portas').append(criar('h3',porta.titulo),criar('p',porta.para_quem),link(porta.curso,porta.url));
  }
  function cartao(p){
    const feita=salvo.feitas.includes(p.numero);
    const card=criar('article',''), cab=criar('div','','etapa');
    cab.append(criar('span','Palco '+numero(p.numero),'numero'),criar('span',feita?'Feita':'A fazer',feita?'feita':''));
    const acao=modo==='3d'?'Ir até lá':'Abrir etapa';
    const ir=botao(acao,()=>irPara(p.numero));
    ir.setAttribute('aria-label',acao+' — '+p.titulo);
    card.dataset.numero=p.numero;
    card.append(cab,criar('h3',p.titulo),ir);
    return card;
  }
  function agenda(){
    const total=salvo.feitas.length+' de '+palcos.length+' etapas';
    el('contagem').textContent=total+' feitas';
    el('placar').textContent=total;
    el('rever').hidden=!completo();
    el('proximo').textContent=completo()?'Rever o fecho':'Ir ao próximo palco';
    el('agenda').replaceChildren(...palcos.map(cartao));
    el('pecas').replaceChildren(...pecas.map(p=>criar('li',p.parte_robo+' · '+(visiveis().includes(p.id)?'encaixada':'falta'))));
    const principal=el('acesso').querySelector('[value="3d"]');
    principal.textContent=continuar()?'Continuar: '+total:'Entrar no hangar';
    el('acesso').classList.toggle('retomar',continuar());
    el('reiniciar').hidden=!continuar();
  }
  function fechar(){
    if(!painelAtual)return;
    const foco=origem;
    sairDaSessao();
    painelAtual=null;palcoAtual=null;
    el('acoesPalco').replaceChildren();
    if(painel.open)painel.close();
    conteiner.insertBefore(corpo,el('acoesPalco'));corpo.replaceChildren();
    if(modo==='3d')mundo?.focar();
    else if(foco?.isConnected)foco.focus();
  }
  function abrir(tipo,contexto,titulo){
    if(!painelAtual)origem=document.activeElement;
    painelAtual=tipo;
    el('linkProcesso').hidden=tipo!=='agenda' && tipo!=='fecho';
    el('acoesPalco').replaceChildren();
    corpo.scrollTop=0;
    el('contexto').textContent=contexto;
    const h=criar('h2',titulo);h.id='tituloPainel';h.tabIndex=-1;corpo.replaceChildren(h);
    if(tipo==='sessao' && modo==='sem-3d'){
      el('agenda').querySelector('[data-numero="'+palcoAtual+'"]').append(corpo);
    }else{
      conteiner.insertBefore(corpo,el('acoesPalco'));
      if(tipo==='sessao' && modo==='3d'){
        painel.classList.add('sessao3d');
      }
      if(!painel.open)painel.showModal();
      painel.scrollTop=0;
    }
    h.focus();
  }
  function secao(titulo,texto){corpo.append(criar('h3',titulo),criar('p',texto));}
  function mostrarFecho(){
    sairDaSessao();
    if(modo==='3d')mundo.enquadrarVisor();
    palcoAtual=null;
    abrir('fecho','Jarvis ligado','Seu assistente está montado');
    corpo.append(criar('p',apresentador.encerramento),criar('h3',fecho.pergunta),link(fecho.cta,'https://inema.club'));
    corpo.append(criar('h3','Para ir além'));
    for(const item of dados.alem)corpo.append(link(item.titulo,item.url),criar('p',item.descricao));
  }
  async function marcar(n){
    const p=obter(n);
    if(!p||salvo.feitas.includes(n))return;
    const atual=++rodada;
    fechar();salvo.marcar(n);agenda();
    if(modo==='3d'){
      el('legenda').hidden=true;
      el('encaixe').textContent='';
      el('proximo').disabled=true;
      await mundo.verRobo(p.pecas);
      if(atual!==rodada)return;
      mundo.atualizar(visiveis(),false,true);
      const nomes=p.pecas.map(id=>pecas.find(item=>item.id===id).parte_robo);
      el('encaixe').textContent=nomes.map(nome=>'Peça encaixada: '+nome).join(' · ');
      await new Promise(resolve=>setTimeout(resolve,700));
      if(atual!==rodada)return;
      el('proximo').disabled=false;
    }
    mundo?.atualizar(visiveis(),completo(),false);
    if(completo())mostrarFecho();
    else if(modo==='sem-3d')el('agenda').children[proxima().numero-1].querySelector('button').focus();
  }
  function sessao(n){
    const p=obter(n);palcoAtual=n;
    abrir('sessao','Palco '+numero(n)+' / '+numero(palcos.length),p.titulo);
    corpo.append(criar('p',p.fala));
    secao('O que você ganha',p.ganho);
    corpo.append(criar('h3','Material'));
    if(p.video){
      const video=p.video;
      const descricao=video.titulo+' ('+video.duracao+')';
      const iniciarVideo=()=>assistir(video,botaoPainel);
      const botaoPainel=botao('Assistir · '+descricao,iniciarVideo);
      corpo.append(botaoPainel);
      if(modo==='3d'){
        el('numeroTelao').textContent='Palco '+numero(n);
        el('tituloTelao').textContent=p.titulo;
        el('materialTelao').textContent=descricao;
        el('assistirTelao').onclick=iniciarVideo;
      }
    }
    for(const m of p.materiais)corpo.append(link(m.titulo,m.url),criar('p',m.detalhe));
    secao('Sua tarefa',p.tarefa);secao('Pronto quando',p.pronto_quando);
    secao('Encaixe no robô',p.pecas.map(id=>pecas.find(item=>item.id===id).parte_robo).join(' · '));
    const feita=salvo.feitas.includes(n);
    const marcarBtn=botao(feita?'Etapa feita':'Marcar como feita',()=>marcar(n));
    marcarBtn.id='marcar';marcarBtn.disabled=feita;(modo==='3d'?el('acoesPalco'):corpo).append(marcarBtn);
  }
  function irPara(n){
    if(!obter(n))return;
    interromper();
    el('encaixe').textContent='';
    if(modo==='entrada')exibir(false);
    if(modo==='3d'){el('dica').hidden=true;el('legenda').hidden=true;mundo.posicionar(n);}
    sessao(n);
  }
  function interromper(){
    sairDaSessao();
    rodada++;el('proximo').disabled=false;
    mundo?.cancelarGiro();
    mundo?.atualizar(visiveis(),completo(),false);
  }
  function exibir(tres){
    fechar();interromper();
    document.body.classList.toggle('imersivo',tres);
    el('programacao').hidden=tres;
    el('menu').hidden=el('placar').hidden=!tres;
    el('legenda').hidden=!tres||salvo.aberturaVista||continuar();
    if(tres && !salvo.aberturaVista)salvo.apresentar();
    modo=tres?'3d':'sem-3d';
    el('entrada').hidden=true; el('evento').hidden=false; el('hangar').hidden=!tres;
    el('cracha').hidden=false; el('cracha').textContent=salvo.nome||'Visitante';
    el('tituloModo').textContent=tres?'Hangar de montagem':'Programação sem 3D';
    el('trocar').textContent=tres?'Assistir sem 3D':'Entrar no hangar';
    el('fala').textContent=apresentador.nome+' · '+apresentador.abertura;
    el('abertura').textContent=el('fala').textContent;
    if(tres && matchMedia('(pointer: coarse)').matches)el('dica').textContent='Use o joystick para andar. Arraste à direita para olhar.';
    mundo?.mostrar(tres);agenda();
    if(tres)mundo.focar();else el('tituloModo').focus();
  }
  function falhou(avisar=true){
    mundo=null;el('toque').replaceChildren();el('cena').replaceChildren();
    if(avisar){
      exibir(false);el('aviso').textContent='O 3D ficou indisponível. A programação está aberta no modo sem 3D.';
      el('aviso').hidden=false;
    }
  }
  async function entrar(tres){
    if(carregando)return;
    el('aviso').hidden=true;
    if(!tres || mundo){exibir(tres);return;}
    carregando=true;
    try{
      const {criarMundo}=await import('./mundo.js');
      await Promise.all(['700 96px Sora','400 16px Inter'].map(font=>document.fonts.load(font).catch(()=>[])));
      mundo=criarMundo(el('cena'),palcos,irPara,el('toque'),falhou,()=>{el('dica').hidden=true;},alinharTelao);
      exibir(true);
    }catch{falhou();}
    finally{carregando=false;}
  }
  el('promessa').textContent=dados.chamada.nucleo.split('. ')[0]+'.';
  el('nome').value=salvo.nome;
  el('acesso').onsubmit=e=>{
    e.preventDefault();salvo.identificar(el('nome').value);entrar(e.submitter?.value!=='sem-3d');
  };
  for(const b of el('acesso').querySelectorAll('button'))b.disabled=false;
  el('trocar').onclick=()=>entrar(modo!=='3d');
  el('rever').onclick=mostrarFecho;
  function limpar(){
    fechar();salvo.limpar();interromper();el('nome').value='';
    el('cracha').textContent='Visitante';el('encaixe').textContent='';
    el('dica').hidden=false;agenda();
    el('confirmacao').hidden=true;
  }
  el('reiniciar').onclick=()=>{el('confirmacao').hidden=false;el('cancelar').focus();};
  el('cancelar').onclick=()=>{el('confirmacao').hidden=true;el('reiniciar').focus();};
  el('zerar').onclick=()=>{limpar();el('nome').focus();};
  el('fechar').onclick=fechar;
  painel.oncancel=e=>{e.preventDefault();fechar();};
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape' && painelAtual){e.preventDefault();fechar();}
  });
  el('dispensar').onclick=()=>{el('legenda').hidden=true;mundo.focar();};
  el('proximo').onclick=()=>proxima()?irPara(proxima().numero):mostrarFecho();
  el('menu').onclick=()=>{
    interromper();
    palcoAtual=null;
    abrir('agenda','Hangar de montagem','Agenda');
    corpo.append(...palcos.map(cartao));
    if(completo())corpo.append(botao('Rever o fecho',mostrarFecho));
    corpo.append(botao('Assistir sem 3D',()=>entrar(false)));
  };
  el('agendaSessao').onclick=el('menu').onclick;
  agenda();
  window.__evento={
    estado:()=>({modo,palcoAtual,videoTelao:estadoVideo(),feitas:salvo.feitas,pecasVisiveis:modo==='3d'?mundo.pecasVisiveis():visiveis(),webgl:!!mundo,
      ...(mundo?.estado()||{posicao:{x:0,z:0},direcao:0}),painel:painelAtual,continuar:continuar()}),
    irPara,marcar,limpar
  };
}
