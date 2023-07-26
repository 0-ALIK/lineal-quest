(()=>{"use strict";const e={powerUps:[],jugador:null,niveles:{"nivel-1":{jugado:!1,tiempo:0,estrellas:0},"nivel-2":{jugado:!1,tiempo:0,estrellas:0},"nivel-3":{jugado:!1,tiempo:0,estrellas:0},"nivel-4":{jugado:!1,tiempo:0,estrellas:0},"nivel-5":{jugado:!1,tiempo:0,estrellas:0}}};class t{constructor(){return localStorage.getItem("data")||localStorage.setItem("data",JSON.stringify(e)),t.instance||(t.instance=this),t.instance}#e(){return JSON.parse(localStorage.getItem("data"))}#t(e){localStorage.setItem("data",JSON.stringify(e))}setNombreJugador(e){const t=this.#e();t.jugador=e,this.#t(t)}getNombreJugador(){return this.#e().jugador}getPowerUps(){return this.#e().powerUps}consumirPowerUp(e){const t=this.#e(),n=t.powerUps.filter((t=>t.id!==e));t.powerUps=n,this.#t(t)}pushPowerUp(e){const t=this.#e(),n={nombre:e,id:Date.now().toString()};t.powerUps.push(n),this.#t(t)}setJuegoData(e,t,n,a){const o=this.#e();o.niveles[e].jugado=t,o.niveles[e].tiempo=n,o.niveles[e].estrellas=a,this.#t(o)}getJuegoData(e){return this.#e().niveles[e]}}class n{currentScene=null;constructor(){return n.instance||(n.instance=this),n.instance}async cargarPantalla(e){this.currentScene&&this.currentScene?.onDestroy();const t=document.getElementById("screen"),n=await fetch(`./templates/${e.template}`).then((e=>e.text()));t.innerHTML=n,e.loadLogic(),this.currentScene=e}}class a{dirPath="/build/assets/audio/";audio=null;constructor(e=null){e&&(this.audio=new Audio(this.dirPath+e))}definirBoton(e=new Document){const t=new Audio(this.dirPath+"hit.mp3"),n=new Audio(this.dirPath+"pop.mp3");e.addEventListener("click",(e=>{t.volume=.8,t.play()})),e.addEventListener("mouseenter",(e=>{n.volume=.6,n.play()}))}play(e=.5,t=!1){this.audio&&(this.audio.loop=t,this.audio.volume=e,this.audio.play())}stop(){this.audio&&this.audio.pause()}}function o(e,t=((e=new HTMLElement)=>{})){for(let n=0;n<e.length;n++)t(e[n])}const s={template:"mapa-niveles.html",posNivelesMapa:{"nivel-1":{top:"50px",left:"50px"},"nivel-2":{top:"150px",left:"150px"},"nivel-3":{top:"250px",left:"250px"},"nivel-4":{top:"150px",left:"300px"},"nivel-5":{top:"350px",left:"350px"}},juegosPorNiveles:{"nivel-1":{template:"juego1.html",loadLogic:function(){},onDestroy:function(){}},"nivel-2":{template:"juego2.html",loadLogic:function(){},onDestroy:function(){}},"nivel-3":{template:"juego3.html",loadLogic:function(){},onDestroy:function(){}},"nivel-4":{template:"juego4.html",loadLogic:function(){},onDestroy:function(){}},"nivel-5":{template:"juego5.html",loadLogic:function(){},onDestroy:function(){}}},loadLogic:function(){const e=document.getElementsByClassName("nivel"),s=new t,i=new a("mapaMusica.mp3");i.play(.5,!0),o(e,(e=>{(new a).definirBoton(e);const t=e.dataset.nivel,o=e.firstElementChild,l=e.lastElementChild;e.style.top=this.posNivelesMapa[t].top,e.style.left=this.posNivelesMapa[t].left,o.innerText=t.split("-").join(" ");const r=s.getJuegoData(t);r.jugado?(l.style.display="block",l.src=`/build/assets/sprites/nivel-estrellas-${r.estrellas}.jpg`):l.style.display="none",e.addEventListener("click",(e=>{i.stop(),(new n).cargarPantalla(this.juegosPorNiveles[t])}))}))},onDestroy:function(){}},i={template:"main-menu.html",loadLogic:function(){const e=document.getElementById("play"),i=document.getElementById("botton-entrar"),l=document.getElementById("pedir-nombre"),r=document.getElementsByTagName("button"),u=document.getElementById("input-entrar"),c=(new t).getNombreJugador();l.style.display="none",e.addEventListener("click",(e=>{c?(new n).cargarPantalla(s):(l.style.display="flex",o(r,(e=>{(new a).definirBoton(e)})))})),i.addEventListener("click",(e=>{(u.value||0!==u.value.trim().length)&&(new n).cargarPantalla(s)}))},onDestroy:function(){}};new t,(new n).cargarPantalla(i)})();