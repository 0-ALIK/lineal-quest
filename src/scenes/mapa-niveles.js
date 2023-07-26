import { recorrerHTMLCollection } from "../helpers/dom-helpers";
import ScenesManager from "../core/ScenesManager";
import juego1 from "./juego1";
import juego2 from "./juego2";
import juego3 from "./juego3";
import juego4 from "./juego4";
import juego5 from "./juego5";
import SoundManager from "../core/SoundModule";
import BaseDatos from "../core/BaseDatos";

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
        const niveles = document.getElementsByClassName('nivel');

        const baseDatos = new BaseDatos();

        const mapaMusica = new SoundManager( 'mapaMusica.mp3' );
        mapaMusica.play(0.5, true);

        recorrerHTMLCollection(niveles, elemento => {
            new SoundManager().definirBoton( elemento );

            const dataset = elemento.dataset.nivel;

            elemento.style.top = this.posNivelesMapa[ dataset ].top;
            elemento.style.left = this.posNivelesMapa[ dataset ].left;

            elemento.firstElementChild.innerText = dataset.split('-').join(' ');
    
            const juegoData = baseDatos.getJuegoData( dataset );

            if( juegoData.juegado ) {
                elemento.lastElementChild.style.display = 'block';
                elemento.lastElementChild.src = `/build/assets/sprites/nivel-estrellas-${ juegoData.estrellas }.jpg`;  
            } else {
                elemento.lastElementChild.style.display = 'none';
            }

            elemento.addEventListener('click', e => {
                mapaMusica.stop();
                
                new ScenesManager().cargarPantalla( this.juegosPorNiveles[ dataset ] );
            });
        });
    },

    onDestroy: function () {
        
    }

};

export default mapaniveles;
