import * as T from '../vendor/three/three.module.js';

export function criarRobo(cena) {
  const chassis=new T.Group();
  cena.add(chassis);
  const material=(color,roughness,metalness)=>new T.MeshStandardMaterial({color,roughness,metalness});
  const perola=material(0xe0e0d9,.4,.35), titanio=material(0x849097,.42,.46);
  const junta=material(0x17191d,.36,.36), vidro=material(0x080a0d,.14,.52);
  // Reflexos de duas caixas de luz no verniz e no visor, em um estúdio escuro.
  const estudio=document.createElement('canvas');
  estudio.width=256;estudio.height=128;
  const luz=estudio.getContext('2d');
  luz.fillStyle='#15171b';luz.fillRect(0,0,256,128);
  luz.fillStyle='#dedfdf';luz.fillRect(45,24,11,53);
  luz.fillStyle='#a9b6c3';luz.fillRect(148,18,38,17);
  luz.fillStyle='#d9a170';luz.fillRect(211,35,5,39);
  const reflexos=new T.CanvasTexture(estudio);
  reflexos.mapping=T.EquirectangularReflectionMapping;
  reflexos.colorSpace=T.SRGBColorSpace;
  for(const mat of [perola,titanio,junta,vidro])mat.envMap=reflexos;
  const pecas=new Map();
  function armadura(id){
    const grupo=new T.Group();
    grupo.name=id;
    grupo.visible=false;
    grupo.userData.estrutura=[];
    grupo.userData.metal=perola.clone();
    chassis.add(grupo);
    pecas.set(id,grupo);
    return grupo;
  }
  // Perfis de revolução: raio e altura em unidades da própria peça.
  function perfil(pontos,inicio=0,arco=2*Math.PI){
    return new T.LatheGeometry(pontos.map(([r,y])=>new T.Vector2(r,y)),40,inicio,arco);
  }
  const elipse=new T.SphereGeometry(1,28,20);
  const casco=[[0,-1],[.37,-.96],[.64,-.76],[.83,-.39],[.96,.04],[1,.43],[.94,.67],[.76,.86],[.44,.97],[0,1]];
  const capacete=perfil(casco);
  const face=perfil(casco,-1.13,2.26);
  const torax=perfil([[0,-1],[.58,-.99],[.66,-.9],[.8,-.32],[.98,.32],[1,.53],[.94,.71],[.7,.91],[.43,1],[0,1]]);
  const membro=perfil([[0,-1],[.49,-.99],[.61,-.91],[.68,-.48],[.88,.02],[1,.48],[.99,.72],[.89,.89],[.64,1],[0,1]]);
  const placa=perfil([[.73,-.92],[.8,-.89],[.87,-.77],[1,.18],[1,.63],[.96,.72],[.89,.75]],-.94,1.88);
  const falange=new T.CapsuleGeometry(1,1.4,3,8);
  function montar(pai,geo,mat,x,y,z,w,h,d){
    const m=new T.Mesh(geo,mat);
    m.position.set(x,y,z);m.scale.set(w,h,d);
    m.castShadow=true;m.receiveShadow=true;pai.add(m);
    return m;
  }
  const base=(geo,mat,...medidas)=>montar(chassis,geo,mat,...medidas);
  const encaixe=(g,geo,...medidas)=>montar(g,geo,g.userData.metal,...medidas);
  const cranio=armadura('modelo'),gola=armadura('canal'),peito=armadura('identidade');
  const nuca=armadura('memoria'),mao=armadura('ferramentas'),punho=armadura('travas');
  const ombro=armadura('testes'),costas=armadura('diario');

  // A haste grafite ocupa o interior da carenagem e sustenta as juntas antes do encaixe.
  function revestir(grupo,geo,mat,x,y,z,w,h,d,fracao,angulo=0){
    const haste=base(geo,junta,x,y,z,w*fracao,h*.98,d*fracao);
    haste.rotation.z=angulo;
    grupo.userData.estrutura.push(haste);
    montar(grupo,geo,mat===perola?grupo.userData.metal:mat,x,y,z,w,h,d).rotation.z=angulo;
  }

  revestir(cranio,capacete,titanio,0,2.075,0,.148,.202,.148,.98);
  encaixe(cranio,capacete,0,2.075,0,.151,.204,.151);
  base(face,vidro,0,2.075,.004,.154,.201,.154);
  const linha=base(elipse,new T.MeshBasicMaterial({color:0xffbd67}),0,2.125,.162,.055,.002,.003);
  linha.visible=false;
  base(membro,junta,0,1.88,-.009,.078,.108,.079);
  encaixe(gola,membro,0,1.84,.016,.087,.044,.083);
  encaixe(nuca,elipse,0,1.992,-.104,.082,.089,.046);
  revestir(nuca,torax,titanio,0,1.60,-.014,.285,.228,.149,.4);
  encaixe(peito,torax,0,1.602,.013,.29,.219,.16);
  encaixe(costas,torax,0,1.58,-.116,.202,.179,.077);
  for(let i=0;i<3;i++){
    const medidas=[0,1.207+i*.075,0,.155+i*.012,.055,.115+i*.008];
    if(i===1)revestir(costas,torax,titanio,...medidas,.55);
    else base(torax,junta,...medidas);
  }
  nuca.userData.estrutura.push(base(elipse,junta,0,1.704,-.008,.28,.034,.034));
  revestir(costas,torax,perola,0,1.079,-.008,.213,.123,.132,.64);
  for(const lado of [-1,1]){
    const coxa=lado*.127, canela=lado*.147;
    base(elipse,junta,coxa,.966,0,.088,.084,.092);
    revestir(cranio,membro,perola,coxa,.783,-.005,.101,.207,.111,.48,lado*.07);
    base(elipse,junta,canela,.56,.006,.076,.076,.077);
    montar(gola,placa,titanio,canela,.569,.039,.071,.078,.053);
    revestir(gola,membro,perola,canela,.34,-.021,.078,.193,.09,.5);
    base(elipse,junta,canela,.135,-.012,.055,.065,.058);
    revestir(gola,capacete,titanio,canela,.066,.051,.091,.063,.169,.72);
    const braco=lado*.332, cotovelo=lado*.372, pulso=lado*.392;
    base(elipse,junta,braco,1.704,-.008,.108,.101,.11);
    encaixe(ombro,elipse,braco+lado*.015,1.732,0,.103,.108,.117);
    encaixe(ombro,elipse,braco+lado*.102,1.746,0,.023,.053,.055);
    revestir(ombro,membro,perola,braco+lado*.021,1.531,-.014,.071,.145,.078,.52,lado*.12);
    base(elipse,junta,cotovelo,1.377,-.012,.059,.059,.062);
    revestir(punho,membro,titanio,pulso,1.235,.007,.061,.127,.072,.57);
    encaixe(mao,placa,pulso,1.248,.018,.064,.133,.067).rotation.y=lado*.55;
    base(elipse,junta,pulso,1.096,.016,.044,.048,.046);
    if(lado===-1)encaixe(punho,membro,pulso,1.105,.017,.055,.036,.055);
    base(elipse,junta,pulso,1.024,.022,.056,.08,.038);
    if(lado===-1)encaixe(mao,elipse,pulso,1.027,.037,.058,.068,.033);
    for(let i=0;i<4;i++){
      const x=pulso+(i-1.5)*.026, y=.954+Math.abs(i-1.65)*.008;
      revestir(mao,falange,titanio,x,y,.027,.011,.019,.012,.76);
      base(falange,junta,x,y-.048,.035,.01,.015,.011).rotation.x=-.36;
    }
    revestir(mao,falange,titanio,pulso-lado*.054,.997,.045,.014,.025,.013,.76,-lado*.44);
  }
  return {
    pecasVisiveis:()=>Array.from(pecas.values()).filter(g=>g.visible).map(g=>g.name),
    atualizar(ids,completo,animar){
      linha.visible=completo;
      for(const [id,g] of pecas){
        const mostrar=ids.includes(id);
        g.userData.tempo=mostrar && !g.visible && animar ? .65 : 0;
        g.visible=mostrar;
      }
      this.quadro(0);
    },
    quadro(dt){
      let emMovimento=false;
      for(const g of pecas.values()){
        if(g.userData.tempo>0)emMovimento=true;
        const t=Math.max(0,(g.userData.tempo||0)-dt);
        g.userData.tempo=t;
        for(const haste of g.userData.estrutura)haste.visible=!g.visible || t>0;
        const sinal=['memoria','diario'].includes(g.name)?-1:1;
        g.position.z=sinal*.45*(t/.65)**2;
        g.userData.metal.emissive.setHex(0xffc277);
        g.userData.metal.emissiveIntensity=t*.98;
      }
      return emMovimento;
    }
  };
}
