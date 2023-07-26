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
            desbloqueables:[]
        }
        //verifica si ya hay una partida guardada en el localstorage
        GM.setearBoton('#play', () => {
            abrirModal();
        });

        const abrirModal = ()=>{
            if(localStorage.getItem('usuario-progreso')) new ScenesManager().cargarPantalla( mapaniveles );
            document.querySelector('.modal').classList.remove('hide');
            GM.setearBoton('.continuar-menu',()=>{
                const nombre = document.querySelector('.nombre').value || 'Invitado';
                document.querySelector('.modal').classList.add('hide');
                usuario.nombre = nombre;
                localStorage.setItem('usuario-progreso', JSON.stringify(usuario))
                new ScenesManager().cargarPantalla( mapaniveles );
            })
        }
    },

    onDestroy: function () {},
};



export default mainmenu;