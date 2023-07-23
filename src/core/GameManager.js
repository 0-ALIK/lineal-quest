import ScenesManager from "./ScenesManager";
import mapaniveles from "../scenes/mapa-niveles";

export default class GameManager{
    //SFX
    hoveraudio;
    hitaudio;

    //datos del juego
    datoUsuario;
    datoJuego;
    intervalid;

    constructor() {
        this.hoveraudio = new Audio('/build/assets/audio/pop.mp3');
        this.hitaudio = new Audio('/build/assets/audio/hit.mp3');
        this.datoUsuario = JSON.parse(localStorage.getItem('usuario-progreso'));
        this.datoJuego = {estrellas: 0, vida: 3, tiempo: 0};
    }

    //setea el boton del modal
    setearModal=()=>{
        const btnContinuar = document.querySelector('.continuar'); 
        this.setearBoton(btnContinuar, () => {
            new ScenesManager().cargarPantalla( mapaniveles );
        });
    }

    //recibe como parametro el tiempo en segundos que se demorara en cerrar el juego o inicializarlo
    cerrarJuego = (delay=0) => {
        setTimeout(() => {
        const modal = document.querySelector('.modal');
        const modalTexto = document.querySelector('.preparado');
        const pantallaResultado = document.querySelector('.resultado');
        pantallaResultado.classList.add('hide');
        modalTexto.classList.add('hide');
        modal.classList.add('hide');
        },delay*1000)
    }

    //recibe como parametro el id o clase de un objetoDOM donde se mostrara el tiempo, el tiempo en minutos del juego y una funcion a ejecutar
    //la funcion se ejecuta cada segundo
    inicarJuego = (DOMObject,tiempo ,funcion = function(){}) =>
    {   
        const cuadroTiempo = document.querySelector(DOMObject) || document.getElementById(DOMObject);
        this.datoJuego.tiempo = tiempo;
        let minute = tiempo;
        let sec = 1;
        this.intervalid = setInterval(() => {
            cuadroTiempo.innerHTML = minute + ':' + sec;
            if(this.datoJuego.vida <= 0) this.nivelFallido();
            funcion();
            if (sec == 0) {
                if (minute == 0 && sec ==0) this.nivelFallido();
                minute--;
                this.datoJuego.tiempo = minute;
                sec = 60;
            }
            sec--;
        }, tiempo * 1000);
    }

    //agrega los efectos de sonido a un boton y ejecuta una funcion
    //recibe como parametro el id o class de un elemento del DOM y la funcion a ejecutar EJ. --> setearBoton('id', () => { console.log('esto sale al clickear'); })
    setearBoton = (DOMElement, funcion = function(){}) => {
        let boton;
        if(DOMElement.className) 
        {
            boton = DOMElement
        }
        else{
            boton = document.querySelector(DOMElement) || document.getElementById(DOMElement);
        };
        boton.addEventListener('mouseover', e => {
            this.hoveraudio.load();
            this.hoveraudio.play();
        });
        boton.addEventListener('click', e => {
            this.hitaudio.currentTime = 0.2;
            this.hitaudio.play();
            funcion(); 
        });
    }

    //recibe un objeto del dom, estos serian el cuadro de vida y la vida del jugador
    restarVida= (DOMvida, DOMcuadroVida) => {
        const vida = document.querySelector(DOMvida) || document.getElementById(DOMvida);
        const cuadroVida = document.querySelector(DOMcuadroVida) || document.getElementById(DOMcuadroVida);
        this.datoJuego.vida--;
        cuadroVida.classList.add('malo');
        vida.innerHTML = vida.innerHTML.slice(0, -2);
        setTimeout(() => {
            cuadroVida.classList.remove('malo');
          }, 500);
    }

    //muestra nivel fallido en el modal
    nivelFallido = () => {
        const modal = document.querySelector('.modal');
        const pantallaResultado = document.querySelector('.resultado');
        const textoResultado = document.querySelector('.resultado-txt');
        modal.classList.remove('hide');
        pantallaResultado.classList.remove('hide');
        textoResultado.classList.add('fallido');
        textoResultado.innerHTML = 'Nivel Fallido';
        clearInterval(this.intervalid);
    }

    //recibe como parametro el id o clase del personaje, su dialogo y un delay
    personajeHablar = (personajeDOM,texto, tiempo =0) => {
        setTimeout(() => {
        const personaje = document.querySelector(personajeDOM) || document.getElementById(personajeDOM);
        const hablarSonido = new Audio('/build/assets/audio/hablar.mp3');
        const textoHablar = document.querySelector('.texto');
        hablarSonido.load();
        hablarSonido.currentTime = 0;
        textoHablar.innerHTML = texto;
        textoHablar.classList.add('hablar');
        personaje.classList.add('hablar-pj');
        hablarSonido.play();
         setTimeout(() => {
            hablarSonido.pause();
            personaje.classList.remove('hablar-pj');
            textoHablar.classList.remove('hablar');
         }, 4000);}, tiempo*1000)
    }

    //calcula la estrella que va a ganar en el nivel :v
    calcularEstrellas = () => {
        if(this.datoJuego.vida == 3 && this.datoJuego.tiempo <= 3) this.datoJuego.estrellas = 3; 
        if(this.datoJuego.vida <= 2 && this.datoJuego.tiempo >= 2) this.datoJuego.estrellas = 2; 
        if(this.datoJuego.vida <= 1 && this.datoJuego.tiempo >= 2) this.datoJuego.estrellas = 2; 
        if(this.datoJuego.vida == 1 && this.datoJuego.tiempo >= 1) this.datoJuego.estrellas = 1; 
        if(this.datoJuego.vida == 1 && this.datoJuego.tiempo >= 0) this.datoJuego.estrellas = 1; 
    }

    //termina el juego y muestra los resultados en el modal
    terminarJuego = () => {
        const modal = document.querySelector('.modal');
        const pantallaResultado = document.querySelector('.resultado');
        const textoResultado = document.querySelector('.resultado-txt');
        const estrellas = document.querySelector('.estrellas-resultado');
        if(this.datoJuego.estrellas == 1) estrellas.innerHTML = '⭐';
        if(this.datoJuego.estrellas == 2) estrellas.innerHTML = '⭐⭐';
        if(this.datoJuego.estrellas == 3) estrellas.innerHTML = '⭐⭐⭐';
        modal.classList.remove('hide');
        pantallaResultado.classList.remove('hide');
        textoResultado.classList.remove('fallido');
        textoResultado.innerHTML = 'Nivel Completado';
        clearInterval(this.intervalid);
    }
    //guardar el progreso en el localStorage
    guardarResultado = (nivelActual) => {
        //IMPORTANTE!!!!!!!!!!!!!!
        //cuando el jugador completa el nivel hay que desbloquearle el siguiente nivel, para ello le pusheamos el siguiente nivel
        //si estamos en el nivel 1 debemos pushear en progreso = {nivel:2,estrellas:0}
        if(!this.datoUsuario.progreso[nivelActual]) this.datoUsuario.progreso.push({nivel:nivelActual+1,estrellas:0})
        //para guarda el puntaje mas alto
        if(this.datoUsuario.progreso[0].estrellas < this.datoJuego.estrellas) this.datoUsuario.progreso[0].estrellas = this.datoJuego.estrellas;
        localStorage.setItem('usuario-progreso', JSON.stringify(this.datoUsuario))
    }

    //metodo hecho exclusivamente para el minijuego de escoger la mejor respuesta
    //acepta el id o clase de un nodelist, la opcion correcta de ese nodelist, y dos funciones, una para la resp mal y otra para la resp buena
    //ejemplo tengo 4 botones con la clase .opc, de esos 4 botones la opcion correcta es la 1 ==> setearopciones('.opc', 1, func, func);
    setearOpciones = (DOMopciones, opcionCorrecta, respuestaMala = function(){}, respuestaBuena = function(){} ) => {
        const botones = document.querySelectorAll(DOMopciones)
           Array.from(botones).map((boton, index) => {
                if(index != opcionCorrecta){
                this.setearBoton(boton, respuestaMala);
            }
            })
            //respuesta correcta
            botones[opcionCorrecta].addEventListener('click', e => {
                respuestaBuena();
            })
    }

    //agrega el efecto de sonido de respuesta correcta
    SFXRespuestaBuena = () => {
        const correcto= new Audio('/build/assets/audio/correcto.mp3');
        this.hitaudio.pause();
        correcto.play();
    }

    //agrega el efecto de sonido de respuesta mala
    SFXRespuestaMala = () => {
         const incorrecto= new Audio('/build/assets/audio/incorrecto.mp3');
         this.hitaudio.pause();
         incorrecto.play();
    }



}

