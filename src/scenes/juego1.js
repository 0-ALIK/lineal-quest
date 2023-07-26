import GameManager from "../core/GameManager";

const juego1 = {

    template: 'juego1.html',

    loadLogic: function () {
        const GM = new GameManager();
        GM.setearModal();
        GM.setearPW('.vidaextra', '.congelacion');
        //seteamos los power ups
        //vida extra
        GM.setearBoton('.pw-vidaextra', ()=>{
            GM.pwVidaExtra('.vida', '.vidaextra','.vida-jugador');
        });

        //congelacion
        GM.setearBoton('.pw-congelacion', ()=>{
            GM.pwCongelacion('.tiempo', '.congelacion')
        });

        GM.cerrarJuego(3);
        GM.personajeHablar('.personaje', 'Hola, soy Lucy! trabajo aqui en una tienda de ropa');
        GM.personajeHablar('.personaje', 'Necesito ayuda encontrando cuantas variables hay en <br> este problema, si no los encuentro mi jefe <br>me va a despedir!! ayudame porfavor!!',5);
        
        const respuestaMala = ()=>{
            GM.SFXRespuestaMala();
            GM.personajeHablar('.personaje', 'No, no es correcto, quizas los tipos de prenda<br> tengan algo que ver', 0)
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