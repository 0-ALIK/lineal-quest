import ScenesManager from "../core/ScenesManager";
import mapaniveles from "./mapa-niveles";

const mainmenu = {

    template: 'main-menu.html',

    loadLogic: function () {

        const buttonPlay = document.getElementById('play');

        buttonPlay.addEventListener('click', e => {
            new ScenesManager().cargarPantalla( mapaniveles );
        });
    },

    onDestroy: function () {},
};



export default mainmenu;