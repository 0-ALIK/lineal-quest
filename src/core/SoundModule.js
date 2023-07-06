export default class SoundModule {

    constructor(idsound) {
        this.sound = document.getElementById(idsound);
    }

    reproducir() {
        if(this.sound.paused) {
            this.sound.currentTime = 0;
            this.sound.play();
        }
    }

    detener() {
        this.sound.pause();
    }
   
}