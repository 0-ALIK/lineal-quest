import GameManager from "../core/GameManager";

const juego7 = {

    template: 'juego7.html',
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
        GM.personajeHablar('.personaje', 'perdon por ternerte aqui ayudandome!');
        GM.personajeHablar('.personaje', 'Tengo que encontrar las restricciones!!',5);
        
        const respuestaMala = ()=>{
            GM.SFXRespuestaMala();
            GM.personajeHablar('.personaje', 'solo podemos vender 45 camisetas y 35 pantalones', 0)
            GM.restarVida('.vida-jugador', '.vida');
        }

        const respuestaBuena = ()=>{
            GM.SFXRespuestaBuena();
            GM.calcularEstrellas();
            GM.terminarJuego();
            GM.guardarResultado(7);
        }

        GM.setearBoton('.validar', ()=>{
            validarCampos();
        })

        const validarCampos = ()=>{
            const campos = document.querySelectorAll('.resp');
            const respuestas = [45,35];
            let camposCorrectos = 0;
            console.log(campos);
            campos.forEach((campo, index)=>{
                if(campo.value == respuestas[index]){
                    campo.classList.remove('erroneo');
                    campo.classList.add('bueno');
                    camposCorrectos++;
                }else{
                    campo.classList.remove('bueno');
                    campo.classList.add('erroneo');
                }
            })
            if(camposCorrectos == campos.length){respuestaBuena();}
            else{respuestaMala();}
            }

        GM.inicarJuego('.tiempo-juego', 3 , ()=>{  });
    },

    onDestroy: function () {
        const GM = new GameManager();
        GM.cerrarJuego();
    }
}; 

export default juego7;