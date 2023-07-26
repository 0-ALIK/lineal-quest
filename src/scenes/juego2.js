import GameManager from "../core/GameManager";
import ScenesManager from "../core/ScenesManager";
import mapaniveles from "./mapa-niveles";

const juego2 = {

    template: 'juego2.html',

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
        GM.personajeHablar('.personaje', 'Hola, gracias por ayudarme la vez anterior!');
        GM.personajeHablar('.personaje', 'El vendedor de fruta local esta teniendo problemas,<br>hay que ayudarlo!!',5);
        GM.personajeHablar('.personaje', 'Encuentra cuantas restricciones hay!!',10);
        
        const respuestaMala = ()=>{
            GM.SFXRespuestaMala();
            GM.personajeHablar('.personaje', 'No, no es correcto, seguro las condiciones del<br>problema tiene algo que ver', 0)
            GM.restarVida('.vida-jugador', '.vida');
        }

        const respuestaBuena = ()=>{
            GM.SFXRespuestaBuena();
            GM.calcularEstrellas();
            GM.terminarJuego();
            GM.guardarResultado(2);
        }

        GM.setearOpciones('.opc', 2 , respuestaMala,respuestaBuena);
        GM.inicarJuego('.tiempo-juego', 3 , ()=>{  });
    },

    onDestroy: function () {
        const GM = new GameManager();
        GM.cerrarJuego();
    }
}; 

export default juego2;