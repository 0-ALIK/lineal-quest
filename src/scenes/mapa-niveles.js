import { recorrerHTMLCollection } from "../helpers/dom-helpers";
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
        "nivel-1": {top: '50px', left: '50px'},
        "nivel-2": {top: '150px', left: '150px'},
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
        const niveles = document.getElementsByClassName('sprite');

        recorrerHTMLCollection(niveles, elemento => {
            elemento.style.top = this.posNivelesMapa[ elemento.dataset.nivel ].top;
            elemento.style.left = this.posNivelesMapa[ elemento.dataset.nivel ].left;

            elemento.lastElementChild.src = '/build/assets/sprites/nivel-estrellas-0.jpg';

            elemento.addEventListener('click', e => {
                new ScenesManager().cargarPantalla( this.juegosPorNiveles[ elemento.dataset.nivel ] );
            });

        });
    
    },

    onDestroy: function () {
        
    }

};

export default mapaniveles;
