(()=>{"use strict";class e{currentScene=null;constructor(){return e.instance||(e.instance=this),e.instance}async cargarPantalla(e){this.currentScene&&this.currentScene?.onDestroy();const t=document.getElementById("pantalla"),n=await fetch(`./templates/${e.template}`).then((e=>e.text()));t.innerHTML=n,e.loadLogic(),this.currentScene=e}}const t={template:"mapa-niveles.html",posNivelesMapa:{"nivel-1":{top:"50px",left:"50px"},"nivel-2":{top:"150px",left:"150px"},"nivel-3":{top:"250px",left:"250px"},"nivel-4":{top:"150px",left:"300px"},"nivel-5":{top:"350px",left:"350px"}},juegosPorNiveles:{"nivel-1":{template:"juego1.html",loadLogic:function(){},onDestroy:function(){}},"nivel-2":{template:"juego2.html",loadLogic:function(){},onDestroy:function(){}},"nivel-3":{template:"juego3.html",loadLogic:function(){},onDestroy:function(){}},"nivel-4":{template:"juego4.html",loadLogic:function(){},onDestroy:function(){}},"nivel-5":{template:"juego5.html",loadLogic:function(){},onDestroy:function(){}}},loadLogic:function(){!function(e,t=((e=new HTMLElement)=>{})){for(let n=0;n<e.length;n++)t(e[n])}(document.getElementsByClassName("sprite"),(t=>{t.style.top=this.posNivelesMapa[t.dataset.nivel].top,t.style.left=this.posNivelesMapa[t.dataset.nivel].left,t.lastElementChild.src="/build/assets/sprites/nivel-estrellas-0.jpg",t.addEventListener("click",(n=>{(new e).cargarPantalla(this.juegosPorNiveles[t.dataset.nivel])}))}))},onDestroy:function(){}},n={template:"main-menu.html",loadLogic:function(){document.getElementById("play").addEventListener("click",(n=>{(new e).cargarPantalla(t)}))},onDestroy:function(){}};(new e).cargarPantalla(n)})();