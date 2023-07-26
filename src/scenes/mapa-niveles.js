import GameManager from "../core/GameManager";
import ScenesManager from "../core/ScenesManager";
import juego1 from "./juego1";
import juego2 from "./juego2";
import juego3 from "./juego3";
import juego4 from "./juego4";
import juego5 from "./juego5";
import juego6 from "./juego6";
import juego7 from "./juego7";
import juego8 from "./juego8";

const mapaniveles = {

    template: 'mapa-niveles.html',

    // posición de los sprites de los niveles en el mapa
    posNivelesMapa: {
        "nivel-1": {top: '260px', left: '50px'},
        "nivel-2": {top: '550px', left: '250px'},
        "nivel-3": {top: '650px', left: '475px'},
        "nivel-4": {top: '550px', left: '700px'},
        "nivel-5": {top: '275px', left: '850px'},
        "nivel-6": {top: '275px', left: '1150px'},
        "nivel-7": {top: '230px', left: '1400px'},
        "nivel-8": {top: '150px', left: '1600px'},
    },

    juegosPorNiveles: {
        "nivel-1": juego1,
        "nivel-2": juego2,
        "nivel-3": juego3,
        "nivel-4": juego4,
        "nivel-5": juego5,
        "nivel-6": juego6,
        "nivel-7": juego7,
        "nivel-8": juego8,
    },
    
    loadLogic: function () {
        const GM = new GameManager()
        const datoUsuario = JSON.parse(localStorage.getItem('usuario-progreso'));
        console.log(localStorage.getItem('usuario-progreso'))
        const niveles = document.getElementsByClassName('sprite');
        
        Array.from(niveles).map((elemento,index) => {
            console.log(index);
            if(datoUsuario.progreso[index]){  
                elemento.style.top = this.posNivelesMapa[ elemento.dataset.nivel ].top;
                elemento.style.left = this.posNivelesMapa[ elemento.dataset.nivel ].left;
                //muestra el numero del nivel
                elemento.firstElementChild.innerText = 'Nivel ' + elemento.dataset.nivel.split('-')[1];
                //todos los niveles estan oculto, entonces este muestra los niveles que estan desbloqueados
                elemento.classList.remove('hide');

                const estrellas = datoUsuario.progreso[index].estrellas;
                if(estrellas == 1) elemento.lastElementChild.innerText = '⭐';
                if(estrellas == 2) elemento.lastElementChild.innerText = '⭐⭐';
                if(estrellas == 3) elemento.lastElementChild.innerText = '⭐⭐⭐';

                GM.setearBoton(elemento,()=>{
                    new ScenesManager().cargarPantalla( this.juegosPorNiveles[ elemento.dataset.nivel ] );
                })
        }
        });

        GM.setearBoton('.desbloqueables',()=>{
            abrirModal();
        })
        
        GM.setearBoton('.regresar',()=>{
            cerrarModal();
        })

        const obtenerEstrellas = ()=>{
            let estrellas = 0;
            datoUsuario.progreso.forEach((nivel)=>{
                estrellas = estrellas + nivel.estrellas;
            })
            return estrellas;
        }

        const setearPW=()=>{
            const pwVida = document.querySelector('.pw-vidaExtra');
            const pwCongelar = document.querySelector('.pw-congelacion');
            pwVida.innerHTML = datoUsuario.pw_vida;
            pwCongelar.innerHTML = datoUsuario.pw_congelar;
        }

        const cargarDatos = ()=>{
            const nombre = document.querySelector('.pj-nombre');
            const pjEstrellas = document.querySelector('.pj-estrellas');
            nombre.innerHTML = datoUsuario.nombre || 'Jugador';
            pjEstrellas.innerHTML = obtenerEstrellas();
        }

        const cerrarModal = ()=>{
            document.querySelector('.modal').classList.add('hide');
        }

        const abrirModal = ()=>{
            document.querySelector('.modal').classList.remove('hide');
            setearDesbloqueables();
        }

        const setearDesbloqueables = ()=>{
            const desbloqueables = document.querySelectorAll('.desbloqueable-item');
            desbloqueables.forEach((elemento,index)=>{
                console.dir(elemento)
                const estrellasRequridas = elemento.children[0].innerHTML.slice(1);
                const estrellas = obtenerEstrellas();
                console.log(estrellas);
                if( estrellas >= estrellasRequridas && elemento.children[3].classList.contains('hide')){
                    GM.setearBoton(elemento.children[3],()=>{
                        obtenerDesbloqueable(elemento.children[2].innerHTML, index%2);
                        elemento.children[3].classList.add('hide');
                        setearPW();
                    })
                    elemento.children[3].classList.remove('hide');
                }
                if(datoUsuario.desbloqueables[index]){
                    elemento.children[2].innerHTML = 'Reclamado';
                    elemento.children[3].classList.add('hide');
                }
            })
            console.log(desbloqueables);
        }

        const obtenerDesbloqueable = (cantidad, tipo)=>{
            console.log(cantidad, tipo);
            if(tipo == 0){
                datoUsuario.pw_vida = datoUsuario.pw_vida + parseInt(cantidad);
                datoUsuario.desbloqueables.push(1);
                localStorage.setItem('usuario-progreso', JSON.stringify(datoUsuario))
                setearDesbloqueables();
            }
            if(tipo == 1){
                datoUsuario.pw_congelar = datoUsuario.pw_congelar + parseInt(cantidad);
                datoUsuario.desbloqueables.push(1);
                localStorage.setItem('usuario-progreso', JSON.stringify(datoUsuario))
                setearDesbloqueables();
            }
        }

        setearPW();
        cargarDatos();
    },

    onDestroy: function () {
        
    }

};

export default mapaniveles;
