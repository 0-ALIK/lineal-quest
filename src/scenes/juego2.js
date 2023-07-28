import BaseDatos from "../core/BaseDatos";
import PowerUpsManager from "../core/PowerUpsManger";
import ScenesManager from "../core/ScenesManager";
import SoundManager from "../core/SoundModule";
import { crearModal } from "../helpers/animatios-helpers";
import mapaniveles from "./mapa-niveles";

const juego2 = {

    template: 'juego2.html',

    baseDatos: null,
    vidasNumber: null,

    loadLogic: function () {
        crearModal('Juego 2');
        const musica = new SoundManager('cupcake.mp3');
        musica.play(0.5, true);

        this.baseDatos = new BaseDatos();
        this.vidasNumber = this.baseDatos.getVidasJugador();

        const powerups = document.getElementById('powerups');
        const vidas = document.getElementById('vidas');
        const taller1 = document.getElementById('taller1');
        const taller2 = document.getElementById('taller2');
        const taller3 = document.getElementById('taller3');

        taller1.addEventListener('click', e => {
            new SoundManager('incorrecto.mp3').play(0.8);
            this.vidasNumber -= 1;
            this.baseDatos.setVidasJugador( this.vidasNumber );
            powerUpManger.colocarVidasHTML( vidas, this.vidasNumber );
        });

        taller2.addEventListener('click', e => {
            new SoundManager('incorrecto.mp3').play(0.8);
            this.vidasNumber -= 1;
            this.baseDatos.setVidasJugador( this.vidasNumber );
            powerUpManger.colocarVidasHTML( vidas, this.vidasNumber );
        });

        taller3.addEventListener('click', e => {

        });


        document.getElementById('regresar').addEventListener('click', e => {
            musica.stop();
            new ScenesManager().cargarPantalla(mapaniveles);
        });


        const powerupsArray = this.baseDatos.getPowerUps();
    
        const powerUpManger = new PowerUpsManager();
        powerUpManger.colocarVidasHTML( vidas, this.vidasNumber );

        if( powerupsArray.length !== 0 ) {
            powerUpManger.colocarPowerUpsHTML( powerups, powerupsArray );
        }

    },

    onDestroy: function () {
        new SoundManager('cupcake.mp3').stop();
    }
}; 

export default juego2;