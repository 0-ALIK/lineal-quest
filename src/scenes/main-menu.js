import ScenesManager from "../core/ScenesManager";
import mapaniveles from "./mapa-niveles";
import GameManager from "../core/GameManager";
const mainmenu = {
    
    template: 'main-menu.html',

    loadLogic: function () {
        const GM = new GameManager();
        //datos del usuario
        const usuario = {
            nombre: 'PRUEBA1',
            progreso:[{nivel:1,estrellas:0}],
            pw_vida:1,
            pw_congelar:1,
        }
        //verifica si ya hay una partida guardada en el localstorage
        if(!localStorage.getItem('usuario-progreso')) localStorage.setItem('usuario-progreso', JSON.stringify(usuario))
        GM.setearBoton('#play', () => {
            new ScenesManager().cargarPantalla( mapaniveles );
        });
    },

    onDestroy: function () {},
};



export default mainmenu;