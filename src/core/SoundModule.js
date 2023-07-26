export default class SoundManager {

    dirPath = '/build/assets/audio/';
    audio = null;

    constructor( nombreAudio = null ) {

        if( nombreAudio ) {
            this.audio = new Audio( this.dirPath + nombreAudio );
        }
    }

    definirBoton( boton = new Document() ) {
        const click = new Audio( this.dirPath + 'hit.mp3' );
        const hover = new Audio( this.dirPath + 'pop.mp3' );
        
        boton.addEventListener('click', e => {
            click.volume = 0.8;
            click.play();
        }); 

        boton.addEventListener('mouseenter', e => {
            hover.volume = 0.6;
            hover.play();
        });
    }

    play( volume = 0.5 , loop = false ) {
        if( !this.audio ) return;

        this.audio.loop = loop;

        this.audio.volume = volume;
        this.audio.play();
    }

    stop() {
        if( !this.audio ) return;
        this.audio.pause();
    }
   
}