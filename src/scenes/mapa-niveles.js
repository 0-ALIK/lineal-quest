import { recorrerHTMLCollection } from "../helpers/dom-helpers";
import ScenesManager from "../core/ScenesManager";
import juego1 from "./juego1";
import juego2 from "./juego2";
import juego3 from "./juego3";
import juego4 from "./juego4";
import juego5 from "./juego5";
import SoundManager from "../core/SoundModule";
import BaseDatos from "../core/BaseDatos";
import PowerUpsManager from "../core/PowerUpsManger";

const mapaniveles = {

    template: 'mapa-niveles.html',

    // posición de los sprites de los niveles en el mapa
    posNivelesMapa: {
        "nivel-1": {top: '649px', left: '559px'},
        "nivel-2": {top: '460px', left: '281px'},
        "nivel-3": {top: '350px', left: '848px'},
        "nivel-4": {top: '155px', left: '448px'},
        "nivel-5": {top: '37px', left: '970px'}
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
        const datos = document.getElementById('datos');
        const powerups = document.getElementById('powerups');
        const vidas = document.getElementById('vidas');

        const baseDatos = new BaseDatos();

        const mapaMusica = new SoundManager( 'mapaMusica.mp3' );
        mapaMusica.play(0.5, true);

        recorrerHTMLCollection(niveles, elemento => {
            new SoundManager().definirBoton( elemento );

            const dataset = elemento.dataset.nivel;
            const textoNivel = elemento.firstElementChild;
            const estrellasNivel = elemento.lastElementChild;

            elemento.style.top = this.posNivelesMapa[ dataset ].top;
            elemento.style.left = this.posNivelesMapa[ dataset ].left;

            textoNivel.innerText = dataset.split('-').join(' ');
    
            const juegoData = baseDatos.getJuegoData( dataset );

            if( juegoData.jugado ) {
                estrellasNivel.style.display = 'block';
                estrellasNivel.src = `/build/assets/sprites/nivel-estrellas-${ juegoData.estrellas }.jpg`;  
            } else {
                estrellasNivel.style.display = 'none';
            }

            elemento.addEventListener('click', e => {
                mapaMusica.stop();
                new ScenesManager(  ).cargarPantalla( this.juegosPorNiveles[ dataset ] );
            });
        });

        const powerupsArray = baseDatos.getPowerUps();
        const nombreJugador = baseDatos.getNombreJugador();
        const vidasNumber = baseDatos.getVidasJugador();

        const powerUpManger = new PowerUpsManager();
        powerUpManger.colocarVidasHTML( vidas, vidasNumber );

        if( powerupsArray.length !== 0 ) {
            powerUpManger.colocarPowerUpsHTML( powerups, powerupsArray );
        }

        datos.innerHTML = `<p><strong>Nombre: </strong>${nombreJugador}</p>`

    },

    onDestroy: function () {
    }

};

export default mapaniveles;
