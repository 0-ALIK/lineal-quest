import BaseDatos from "../core/BaseDatos";
import PowerUpsManager from "../core/PowerUpsManger";
import ScenesManager from "../core/ScenesManager";
import SoundManager from "../core/SoundModule";
import { crearModal } from "../helpers/animatios-helpers";
import { recorrerHTMLCollection } from "../helpers/dom-helpers"
import mapaniveles from "./mapa-niveles";

const contenido = `
<div class="dragger" data-size="1">
    <img src="/build/assets/sprites/juego1-mandarina.png" alt="item">
</div>    
<div class="dragger" data-size="1">
    <img src="/build/assets/sprites/juego1-mandarina.png" alt="item">
</div>    
<div class="dragger" data-size="2">
    <img src="/build/assets/sprites/juego1-zanahoria.webp" alt="item">
</div>    
<div class="dragger" data-size="3">
    <img src="/build/assets/sprites/juego1-manzana.png" alt="item">
</div>
<div class="dragger" data-size="3">
    <img src="/build/assets/sprites/juego1-manzana.png" alt="item">
</div>
<div class="dragger" data-size="5">
    <img src="/build/assets/sprites/juego1-sandia.png" alt="item">
</div>
<div class="dragger" data-size="5">
    <img src="/build/assets/sprites/juego1-sandia.png" alt="item">
</div>
`;

const juego1 = {

    template: 'juego1.html',

    espacio: 12, 
    espacioOcupado: 0,
    intentos: 3,
    baseDatos: null,
    vidasNumber: null,
    canasta: null,
    intentosText: null,
    espacioText: null,
    mensajeText: null,
    frutas: null,
    powerUpManger: null,

    reset: function () {

        this.frutas = document.getElementsByClassName('dragger');

        recorrerHTMLCollection( this.frutas, fruta => {

            fruta.addEventListener('click', e => {
                if (this.intentos === 0) return;

                new SoundManager('pop.mp3').play();

                const size = fruta.dataset.size;
                this.canasta.appendChild(fruta);
                this.intentos -= 1;
                this.espacioOcupado += parseInt(size);

                this.intentosText.innerText = 'tienes '+this.intentos+' intentos restantes';

                if( parseInt(size) === 1 )
                    this.mensajeText.innerText = '¡Mandarina!'
                if( parseInt(size) === 2 )
                    this.mensajeText.innerText = '¡Zanahoria!'
                if( parseInt(size) === 3 )
                    this.mensajeText.innerText = '¡Manzana!'
                if( parseInt(size) === 5 )
                    this.mensajeText.innerText = '¡Sandía!'

                const deltaEspacio = (this.espacio - this.espacioOcupado)
                this.espacioText.innerText = 'la canasta tiene '+deltaEspacio+' unidades de espacio restantes'
                

                if(this.intentos === 0) {

                    if(deltaEspacio < 0) {
                        new SoundManager('incorrecto.mp3').play(0.8);
                        this.vidasNumber -= 1;
                        this.baseDatos.setVidasJugador( this.vidasNumber );
                        this.powerUpManger.colocarVidasHTML( vidas, this.vidasNumber );
                        this.mensajeText.innerText = '¡Oye te haz pasado!'
                    }
                    
                    if(this.espacioOcupado < (this.espacio * 0.5) ) {
                        new SoundManager('incorrecto.mp3').play(0.8);
                        this.vidasNumber -= 1;
                        this.baseDatos.setVidasJugador( this.vidasNumber );
                        this.powerUpManger.colocarVidasHTML( vidas, this.vidasNumber );
                        this.mensajeText.innerText = '¡No utilizaste bien el espacio!'
                    }

                    if(this.espacioOcupado === this.espacio ) {
                        new SoundManager('correcto.mp3').play(0.8);
                        this.mensajeText.innerText = '¡OH POR DIOS, LO HICISTE PERFECTO!'
                    }

                    if(this.espacioOcupado > (this.espacio * 0.5) && this.espacioOcupado < this.espacio) {
                        new SoundManager('correcto.mp3').play(0.8);
                        this.mensajeText.innerText = '¡Oye no estuviste mal!'
                    }
                
                }
            
            });

        }); 
    },

    loadLogic: function () {
        crearModal('Juego 1');
        const musica = new SoundManager( 'musicaJuego.mp3' );
        musica.play(0.5, true);

        this.baseDatos = new BaseDatos();
        const vidas = document.getElementById('vidas');
        const powerups = document.getElementById('powerups');
        this.canasta = document.getElementById('canasta');
        this.vidasNumber = this.baseDatos.getVidasJugador();
        this.powerUpManger = new PowerUpsManager();
        this.espacioText = document.getElementById('espacio');
        this.mensajeText = document.getElementById('mensaje');
        this.intentosText = document.getElementById('intentos');
        const reset = document.getElementById('reset');
        const contenedorFrutas = document.getElementById('contenedorFrutas');

        this.espacioText.innerText = 'la canasta tiene '+this.espacio+' unidades de espacio restantes'
        this.intentosText.innerText = 'tienes '+this.intentos+' intentos restantes';

        this.reset();

        reset.addEventListener('click', e => {
            this.intentos = 3;
            this.espacioOcupado = 0;
            this.canasta.innerHTML = '';
            contenedorFrutas.innerHTML = contenido;
            this.reset();
        })

        document.getElementById('regresar').addEventListener('click', e => {
            musica.stop();
            new ScenesManager().cargarPantalla(mapaniveles);
        });


        const powerupsArray = this.baseDatos.getPowerUps();
        this.powerUpManger.colocarVidasHTML( vidas, this.vidasNumber );

        if( powerupsArray.length !== 0 ) {
            this.powerUpManger.colocarPowerUpsHTML( powerups, powerupsArray );
        }
        
    }, 

    onDestroy: function () {

    }
}; 

export default juego1;