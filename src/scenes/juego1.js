import GameManager from "../core/GameManager";

const juego1 = {

    template: 'juego1.html',

    loadLogic: function () {
        const GM = new GameManager();
        GM.setearModal();
        GM.cerrarJuego(3);
        GM.personajeHablar('.personaje', 'Hola, soy el personaje de este juego');
        GM.personajeHablar('.personaje', 'Necesito ayuda encontrando cuantas variables hay en <br> este problema si no los encuentro mi profesora <br>me va a matar!! ayudame porfavor!!',5);
        
        const respuestaMala = ()=>{
            GM.SFXRespuestaMala();
            GM.personajeHablar('.personaje', 'No, no es correcto, sigue intentando', 0)
            GM.restarVida('.vida-jugador', '.vida');
        }

        const respuestaBuena = ()=>{
            GM.SFXRespuestaBuena();
            GM.calcularEstrellas();
            GM.terminarJuego();
            GM.guardarResultado(1);
        }

        GM.setearOpciones('.opc', 0 , respuestaMala,respuestaBuena);
        GM.inicarJuego('.tiempo-juego', 3 , ()=>{  });
    },

    onDestroy: function () {
        const GM = new GameManager();
        GM.cerrarJuego();
    }
}; 

export default juego1;