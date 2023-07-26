import BaseDatos from "../core/BaseDatos";
import ScenesManager from "../core/ScenesManager";
import SoundManager from "../core/SoundModule";
import { recorrerHTMLCollection } from "../helpers/dom-helpers";
import mapaniveles from "./mapa-niveles";

const mainmenu = {

    template: 'main-menu.html',

    loadLogic: function () {

        const buttonPlay = document.getElementById('play');
        const buttonPlayOpcional = document.getElementById('botton-entrar');
        const pedirNombre = document.getElementById('pedir-nombre');
        const botones = document.getElementsByTagName('button');
        const inputNombre = document.getElementById('input-entrar');

        const baseDatos = new BaseDatos();
        const nombreUsuario = baseDatos.getNombreJugador();

        pedirNombre.style.display = 'none';

        buttonPlay.addEventListener('click', e => {
            if(nombreUsuario) {
                new ScenesManager().cargarPantalla( mapaniveles );
                return;
            }

            pedirNombre.style.display = 'flex';

            recorrerHTMLCollection(botones, (elemento => {
                new SoundManager().definirBoton( elemento );
            }));
        });

        buttonPlayOpcional.addEventListener('click', e => {
            if(!inputNombre.value && inputNombre.value.trim().length === 0) return; 

            baseDatos.setNombreJugador( inputNombre.value );
            new ScenesManager().cargarPantalla( mapaniveles );
        }); 

    },

    onDestroy: function () {},
};



export default mainmenu;