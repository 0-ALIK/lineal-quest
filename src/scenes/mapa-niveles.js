import GameManager from "../core/GameManager";
import ScenesManager from "../core/ScenesManager";
import juego1 from "./juego1";
import juego2 from "./juego2";
import juego3 from "./juego3";
import juego4 from "./juego4";
import juego5 from "./juego5";

const mapaniveles = {

    template: 'mapa-niveles.html',

    // posición de los sprites de los niveles en el mapa
    posNivelesMapa: {
        "nivel-1": {top: '260px', left: '50px'},
        "nivel-2": {top: '465px', left: '185px'},
        "nivel-3": {top: '250px', left: '250px'},
        "nivel-4": {top: '150px', left: '300px'},
        "nivel-5": {top: '350px', left: '350px'},
    },

    juegosPorNiveles: {
        "nivel-1": juego1,
        "nivel-2": juego2,
        "nivel-3": juego3,
        "nivel-4": juego4,
        "nivel-5": juego5
    },
    
    loadLogic: function () {
        const GM = new GameManager()
        const datoUsuario = JSON.parse(localStorage.getItem('usuario-progreso'));
        console.log(localStorage.getItem('usuario-progreso'))
        const niveles = document.getElementsByClassName('sprite');

        Array.from(niveles).map((elemento,index) => {
            console.log(index);
            if(datoUsuario.progreso[index]){  
                elemento.style.top = this.posNivelesMapa[ elemento.dataset.nivel ].top;
                elemento.style.left = this.posNivelesMapa[ elemento.dataset.nivel ].left;
                //muestra el numero del nivel
                elemento.firstElementChild.innerText = 'Nivel ' + elemento.dataset.nivel.split('-')[1];
                //todos los niveles estan oculto, entonces este muestra los niveles que estan desbloqueados
                elemento.classList.remove('hide');

                const estrellas = datoUsuario.progreso[index].estrellas;
                if(estrellas == 1) elemento.lastElementChild.innerText = '⭐';
                if(estrellas == 2) elemento.lastElementChild.innerText = '⭐⭐';
                if(estrellas == 3) elemento.lastElementChild.innerText = '⭐⭐⭐';

                GM.setearBoton(elemento,()=>{
                    new ScenesManager().cargarPantalla( this.juegosPorNiveles[ elemento.dataset.nivel ] );
                })
        }
        });

        
        const obtenerEstrellas = ()=>{
            let estrellas = 0;
            datoUsuario.progreso.forEach((nivel)=>{
                estrellas = estrellas + nivel.estrellas;
            })
            return estrellas;
        }

        const cargarDatos = ()=>{
            const nombre = document.querySelector('.pj-nombre');
            const pjEstrellas = document.querySelector('.pj-estrellas');
            nombre.innerHTML = datoUsuario.nombre || 'Jugador';
            pjEstrellas.innerHTML = obtenerEstrellas();
        }

        cargarDatos();
    },

    onDestroy: function () {
        
    }

};

export default mapaniveles;
