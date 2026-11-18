import {Vector2,Vector3,Raycaster} from '../vendor/three/three.module.js';

export function controles(camera,canvas,piso,alvos,visitar,toque,movimento) {
  const teclas=new Set();
  const mapa={w:'frente',arrowup:'frente',s:'tras',arrowdown:'tras',a:'esquerda',arrowleft:'esquerda',d:'direita',arrowright:'direita'};
  const raio=new Raycaster(), ponteiro=new Vector2();
  let toqueInicial=null, arrastou=false, rota=[], aoChegar=null;
  let joyX=0,joyZ=0;
  let moveu=false;
  function mover(){if(!moveu){movimento();moveu=true;}}
  const limite=9.1, obstaculo=1.38;
  canvas.tabIndex=0;
  canvas.setAttribute('aria-label','Hangar 3D. Use WASD ou as setas para caminhar.');
  camera.rotation.order='YXZ';
  function parar() { teclas.clear(); soltar(); rota=[]; aoChegar=null; }
  canvas.onkeydown=e=>{
    const dir=mapa[e.key.toLowerCase()];
    if (dir) { e.preventDefault(); teclas.add(e.key.toLowerCase()); rota=[]; }
  };
  canvas.onkeyup=e=>teclas.delete(e.key.toLowerCase());
  canvas.onblur=()=>teclas.clear();
  const manopla=document.createElement('span');toque.replaceChildren(manopla);
  function soltar(){joyX=joyZ=0;manopla.style.transform='';}
  function joystick(e){
    const r=toque.getBoundingClientRect(), alcance=r.width*.32;
    const x=(e.clientX-r.left-r.width/2)/alcance,z=(e.clientY-r.top-r.height/2)/alcance;
    const escala=Math.max(1,Math.hypot(x,z));
    joyX=x/escala;joyZ=z/escala;
    manopla.style.transform='translate('+joyX*alcance+'px,'+joyZ*alcance+'px)';
    rota=[];
  }
  toque.onpointerdown=e=>{toque.setPointerCapture(e.pointerId);joystick(e);};
  toque.onpointermove=e=>{if(toque.hasPointerCapture(e.pointerId))joystick(e);};
  toque.onlostpointercapture=soltar;
  function limitar(p) {
    const r=Math.hypot(p.x,p.z);
    if(r===0){p.z=obstaculo;return p;}
    const fator=Math.min(limite,Math.max(obstaculo,r))/r;
    p.x*=fator; p.z*=fator;
    return p;
  }
  function ir(p,fim) {
    parar();
    const a=camera.position.clone(); a.y=0;
    const b=limitar(new Vector3(p.x,0,p.z));
    const delta=b.clone().sub(a);
    const t=Math.max(0,Math.min(1,-a.dot(delta)/(delta.lengthSq()||1)));
    if (a.clone().addScaledVector(delta,t).length()<obstaculo+.08) {
      const inicio=Math.atan2(a.z,a.x), final=Math.atan2(b.z,b.x);
      const arco=Math.atan2(Math.sin(final-inicio),Math.cos(final-inicio));
      const passos=Math.max(1,Math.ceil(Math.abs(arco)/.35));
      for(let i=0;i<=passos;i++){
        const ang=inicio+arco*i/passos;
        rota.push(new Vector3(1.65*Math.cos(ang),0,1.65*Math.sin(ang)));
      }
    }
    rota.push(b); aoChegar=fim;
  }
  canvas.onpointerdown=e=>{
    if(toqueInicial || e.button!==0)return;
    canvas.focus(); canvas.setPointerCapture(e.pointerId);
    toqueInicial={x:e.clientX,y:e.clientY,px:e.clientX,py:e.clientY,id:e.pointerId}; arrastou=false;
  };
  canvas.onpointermove=e=>{
    const p=toqueInicial;
    if(!p || p.id!==e.pointerId)return;
    if(Math.hypot(e.clientX-p.x,e.clientY-p.y)>4)arrastou=true;
    if(arrastou){
      mover();
      camera.rotation.y-=(e.clientX-p.px)*.004;
      camera.rotation.x=Math.max(-1.12,Math.min(1.12,camera.rotation.x-(e.clientY-p.py)*.004));
    }
    p.px=e.clientX; p.py=e.clientY;
  };
  canvas.onpointerup=e=>{
    if(toqueInicial?.id!==e.pointerId)return;
    toqueInicial=null;
    if(arrastou)return;
    const rect=canvas.getBoundingClientRect();
    ponteiro.set((e.clientX-rect.left)/rect.width*2-1,1-(e.clientY-rect.top)/rect.height*2);
    raio.setFromCamera(ponteiro,camera);
    const hit=raio.intersectObjects([piso,...alvos],false)[0];
    if(hit?.object.userData.numero)visitar(hit.object.userData.numero);
    else if(hit)ir(hit.point);
  };
  canvas.onlostpointercapture=()=>{toqueInicial=null;};
  function quadro(dt) {
    if(rota.length){
      mover();
      let restante=3*dt;
      while(rota.length && restante>0){
        const p=rota[0],dx=p.x-camera.position.x,dz=p.z-camera.position.z;
        const dist=Math.hypot(dx,dz);
        if(dist>restante){
          camera.position.x+=dx*restante/dist;
          camera.position.z+=dz*restante/dist;
          break;
        }
        camera.position.x=p.x;camera.position.z=p.z;
        restante-=dist;
        rota.shift();
        if(!rota.length)aoChegar?.();
      }
      return;
    }
    const dirs=new Set([...teclas].map(k=>mapa[k]));
    const x=joyX+Number(dirs.has('direita'))-Number(dirs.has('esquerda')),z=joyZ+Number(dirs.has('tras'))-Number(dirs.has('frente'));
    if(x||z)mover();
    const yaw=camera.rotation.y,passo=3*dt/Math.max(1,Math.hypot(x,z));
    camera.position.x+=(x*Math.cos(yaw)+z*Math.sin(yaw))*passo;
    camera.position.z+=(z*Math.cos(yaw)-x*Math.sin(yaw))*passo;
    limitar(camera.position);
  }
  return {ir,quadro,parar};
}
