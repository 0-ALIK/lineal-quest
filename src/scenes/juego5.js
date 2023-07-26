import GameManager from "../core/GameManager";

const juego5 = {

    template: 'juego5.html',

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
        GM.personajeHablar('.personaje', 'Oh no, es mi jefe de nuevo!');
        GM.personajeHablar('.personaje', 'Tengo que encontrar las restricciones!!',5);
        
        const respuestaMala = ()=>{
            GM.SFXRespuestaMala();
            GM.personajeHablar('.personaje', 'Jumm, lo maximo que podemos vender es 50 y 30', 0)
            GM.restarVida('.vida-jugador', '.vida');
        }

        const respuestaBuena = ()=>{
            GM.SFXRespuestaBuena();
            GM.calcularEstrellas();
            GM.terminarJuego();
            GM.guardarResultado(5);
        }

        GM.setearOpciones('.opc', 3 , respuestaMala,respuestaBuena);
        GM.inicarJuego('.tiempo-juego', 3 , ()=>{  });
    },

    onDestroy: function () {
        const GM = new GameManager();
        GM.cerrarJuego();
    }
}; 

export default juego5;