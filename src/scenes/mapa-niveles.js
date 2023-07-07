import { recorrerHTMLCollection } from "../helpers/dom-helpers";

const mapaniveles = {

    template: 'mapa-niveles.html',

    // posición de los sprites de los niveles en el mapa
    posNivelesMapa: {
        "nivel-1": {top: '50px', left: '50px'},
        "nivel-2": {top: '150px', left: '150px'},
        "nivel-3": {top: '250px', left: '250px'},
        "nivel-4": {top: '150px', left: '300px'},
        "nivel-5": {top: '350px', left: '350px'},
    },
    
    loadLogic: function () {
        const niveles = document.getElementsByClassName('sprite');

        recorrerHTMLCollection(niveles, elemento => {
            elemento.style.top = this.posNivelesMapa[ elemento.dataset.nivel ].top;
            elemento.style.left = this.posNivelesMapa[ elemento.dataset.nivel ].left;

            elemento.lastElementChild.src = '/build/assets/sprites/nivel-estrellas-0.jpg';
        });
    
    },

    onDestroy: function () {
        
    }

};

export default mapaniveles;
