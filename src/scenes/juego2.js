import GameManager from "../core/GameManager";
import ScenesManager from "../core/ScenesManager";
import mapaniveles from "./mapa-niveles";

const juego2 = {

    template: 'juego2.html',

    loadLogic: function () {
        const GM = new GameManager();
        GM.setearBoton('.xd', () => { 
            console.log('xd'); 
            GM.guardarResultado(2);
            new ScenesManager().cargarPantalla( mapaniveles );
            GM.SFXRespuestaMala();
        })
    },

    onDestroy: function () {

    }
}; 

export default juego2;